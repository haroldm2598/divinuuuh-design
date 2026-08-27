import {handleUpload, HandleUploadBody} from '@vercel/blob/client'
import {NextResponse} from 'next/server'

export async function POST(request: Request) {
    const body = (await request.json()) as HandleUploadBody

    try {
        const blobToken = process.env.BLOB_READ_WRITE_TOKEN

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
                console.log('test')
            },
            onUploadCompleted: async ({blob, tokenPayload}) => {
                console.log('File Image uploaded to Blob', blob)

                const payload = tokenPayload ? JSON.parse(tokenPayload)
            }
        })

        return NextResponse.json(jsonResponse)
    } catch (err) {
        console.error(err);

        return NextResponse.json(
            { error: "Failed to fetch PostTest" },
            { status: 500 },
        );
    }
}