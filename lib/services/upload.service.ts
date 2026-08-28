import { prisma } from "@/lib/prisma";

type UploadImageToHostingInput = {
    hosting: "vercel-blob";
    url: string;
    projectId: string;
    label: "source" | "rendered";
    blobKey?: string;
};

type HostedImage = {
    url: string;
    blobKey?: string;
};

async function uploadImageToHosting({
    url,
    blobKey,
}: UploadImageToHostingInput): Promise<HostedImage> {
    return { url, blobKey };
}

type CreateBlueprintUploadInput = {
    clerkId: string;
    sourceImage: string;
    sourceBlobKey: string;
    renderedImage?: string | null;
};

export async function createBlueprintUpload({
    clerkId,
    sourceImage,
    sourceBlobKey,
    renderedImage,
}: CreateBlueprintUploadInput) {
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

    const hostedRender = projectId && renderedImage ? renderedImage : null;

    console.log("Rendered image hosting is deferred:", hostedRender);

    if (!hostedSource) {
        throw new Error("Source image hosting failed.");
    }

    return prisma.blueprint.create({
        data: {
            clerkId,
            fileUrl: hostedSource.url,
            fileBlobKey: hostedSource.blobKey ?? sourceBlobKey,
            coverUrl: hostedSource.url,
            fileSize: "0",
        },
    });
}

export async function getBlueprintByBlobKey(
    clerkId: string,
    fileBlobKey: string,
) {
    return prisma.blueprint.findFirst({
        where: {
            clerkId,
            fileBlobKey,
        },
    });
}
