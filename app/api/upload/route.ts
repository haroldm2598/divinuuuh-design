import { NextResponse } from "next/server";

import { handleUpload, HandleUploadBody } from "@vercel/blob/client";
import { auth } from "@clerk/nextjs/server";

export async function POST(request: Request) {
    const { userId, isAuthenticated } = await auth();

    console.log("UPLOAD AUTH:", {
        userId,
        isAuthenticated,
    });

    if (!isAuthenticated || !userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as HandleUploadBody;

    try {
        const jsonResponse = await handleUpload({
            token: process.env.BLOB_READ_WRITE_TOKEN,
            body,
            request,
            onBeforeGenerateToken: async () => {
                try {
                    return {
                        allowedContentTypes: [
                            "image/jpeg",
                            "image/jpg",
                            "image/png",
                            "image/webp",
                        ],
                        addRandomSuffix: true,
                        maximumSizeInBytes: 10 * 1024 * 1024,
                    };
                } catch (error) {
                    throw new Error(
                        `Failed to generate upload token: ${error instanceof Error ? error.message : "Unknown auth error"}`,
                    );
                }
            },
        });

        return NextResponse.json(jsonResponse);
    } catch (error) {
        console.error(error);

        const message =
            error instanceof Error
                ? error.message
                : "An internal server error occurred";
        const status = message.includes("Unauthorized") ? 401 : 500;

        return NextResponse.json({ error: message }, { status });
    }
}
