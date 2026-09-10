import { prisma } from "@/lib/prisma";
import { put } from "@vercel/blob";

const parseImage = async (url: string) => {
    const dataUrlMatch = url.match(/^data:([^;,]+)(;base64)?,([\s\S]*)$/);

    if (dataUrlMatch) {
        const [, contentType, base64Marker, payload] = dataUrlMatch;
        const body = base64Marker
            ? Buffer.from(payload, "base64")
            : Buffer.from(decodeURIComponent(payload));

        return {
            body,
            contentType,
            extension: contentType.split("/")[1] || "bin",
        };
    }

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(
            `Failed to fetch rendered image: ${response.status} ${response.statusText}`,
        );
    }

    const contentType = response.headers.get("content-type")?.split(";")[0];

    if (!contentType?.startsWith("image/")) {
        throw new Error("Rendered image must be an image URL or data URL.");
    }

    return {
        body: Buffer.from(await response.arrayBuffer()),
        contentType,
        extension: contentType.split("/")[1] || "bin",
    };
};

const uploadImageToHosting = async ({
    url,
    projectId,
    label,
    blobKey,
}: UploadImageToHostingInput): Promise<HostedImage> => {
    if (blobKey && /^https?:\/\//.test(url)) {
        return { url, blobKey };
    }

    const image = await parseImage(url);
    const uploaded = await put(
        `blueprints/${projectId}/${label}-${Date.now()}.${image.extension}`,
        image.body,
        {
            access: "public",
            addRandomSuffix: true,
            contentType: image.contentType,
        },
    );

    return { url: uploaded.url, blobKey: uploaded.pathname };
};

export const createBlueprintUpload = async ({
    clerkId,
    sourceImage,
    sourceBlobKey,
    renderedImage,
}: CreateBlueprintUploadInput) => {
    const projectId = clerkId;
    const hosting = "vercel-blob" as const;

    const hostedSource = projectId
        ? await uploadImageToHosting({
              hosting,
              url: sourceImage,
              projectId,
              label: "source",
              blobKey: sourceBlobKey,
          })
        : null;

    const hostedRender =
        projectId && renderedImage
            ? await uploadImageToHosting({
                  hosting,
                  url: renderedImage,
                  projectId,
                  label: "rendered",
              })
            : null;

    if (!hostedSource) {
        throw new Error("Source image hosting failed.");
    }

    return prisma.blueprint.create({
        data: {
            clerkId,
            fileUrl: hostedSource.url,
            fileBlobKey: hostedSource.blobKey ?? sourceBlobKey,
            coverUrl: hostedRender?.url ?? hostedSource.url,
            coverBlobKey: hostedRender?.blobKey,
            renderUrl: hostedRender?.url,
            renderBlobKey: hostedRender?.blobKey,
            fileSize: "0",
        },
    });
};

export const getBlueprintByBlobKey = async (
    clerkId: string,
    fileBlobKey: string,
) => {
    return prisma.blueprint.findFirst({
        where: {
            clerkId,
            fileBlobKey,
        },
    });
};
