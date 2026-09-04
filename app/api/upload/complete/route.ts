import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { createBlueprintUpload } from "@/lib/services/upload.service";

type UploadCompletionBody = {
    url?: unknown;
    pathname?: unknown;
};

export async function POST(request: Request) {
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = (await request.json()) as UploadCompletionBody;

        if (
            typeof body.url !== "string" ||
            typeof body.pathname !== "string" ||
            !body.url ||
            !body.pathname
        ) {
            return NextResponse.json(
                { error: "The uploaded image URL and pathname are required." },
                { status: 400 },
            );
        }

        const blueprint = await createBlueprintUpload({
            clerkId: userId,
            sourceImage: body.url,
            sourceBlobKey: body.pathname,
        });

        return NextResponse.json({
            id: blueprint.id,
            fileUrl: blueprint.fileUrl,
            fileBlobKey: blueprint.fileBlobKey,
        });
    } catch (error) {
        console.error("Failed to save blueprint upload:", error);

        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to save the upload.",
            },
            { status: 500 },
        );
    }
}
