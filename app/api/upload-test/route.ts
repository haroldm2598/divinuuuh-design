import { NextResponse } from "next/server";

import { handleUpload, HandleUploadBody } from "@vercel/blob/client";
import { auth } from "@clerk/nextjs/server";

import { createBlueprintUpload } from "@/lib/services/upload.service";

export async function POST(request: Request) {
    const body = (await request.json()) as HandleUploadBody;

    try {
        const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

        if (!blobToken) {
            throw new Error(
                "Missing BLOB_READ_WRITE_TOKEN. Add it to your environment and restart the server.",
            );
        }

        const jsonResponse = await handleUpload({
            token: blobToken,
            body,
            request,
            onBeforeGenerateToken: async () => {
                try {
                    const { userId } = await auth();

                    if (!userId)
                        throw new Error(
                            "Unauthorized: User must be signed to upload images",
                        );

                    return {
                        allowedContentTypes: [
                            "image/jpeg",
                            "image/jpg",
                            "image/png",
                            "image/webp",
                        ],
                        addRandomSuffix: true,
                        maximumSizeInBytes: 10 * 1024 * 1024,
                        tokenPayload: JSON.stringify({ userId }),
                    };
                } catch (err) {
                    throw new Error(`Failed to generate upload token: ${err}`);
                }
            },
            onUploadCompleted: async ({ blob, tokenPayload }) => {
                console.log("File Image uploaded to Blob", blob);

                const payload = tokenPayload ? JSON.parse(tokenPayload) : null;

                if (!payload?.userId) {
                    throw new Error("Missing user identity in upload payload.");
                }

                await createBlueprintUpload({
                    clerkId: payload.userId,
                    sourceImage: blob.url,
                    sourceBlobKey: blob.pathname,
                });
            },
        });

        return NextResponse.json(jsonResponse);
    } catch (err) {
        console.error(err);

        const message = err instanceof Error ? err.message : "Upload failed";
        const status = message.includes("Unauthorized") ? 401 : 500;

        return NextResponse.json({ error: message }, { status });
    }
}
