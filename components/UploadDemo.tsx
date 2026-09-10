"use client";

import Upload from "@/components/Upload";
import { upload } from "@vercel/blob/client";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { generate3DView } from "@/lib/services/generate3d.service";

export default function UploadDemo() {
    const router = useRouter();
    const { isSignedIn, userId } = useAuth();

    const handleUploadComplete = async (file: File) => {
        try {
            if (!isSignedIn) {
                throw new Error("Please sign in again before uploading.");
            }

            console.log("this is client side. User ID:", userId);

            const uploadedBlob = await upload(file.name, file, {
                access: "public",
                handleUploadUrl: "/api/upload",
                contentType: file.type,
            });

            const { renderedImage } = await generate3DView({
                sourceImage: uploadedBlob.url,
                projectId: userId,
            });

            const completionResponse = await fetch("/api/upload/complete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    url: uploadedBlob.url,
                    pathname: uploadedBlob.pathname,
                    renderedImage,
                }),
            });

            if (!completionResponse.ok) {
                const error = (await completionResponse.json()) as {
                    error?: string;
                };
                throw new Error(error.error ?? "Failed to save the upload.");
            }

            const completion = (await completionResponse.json()) as {
                visualizerPath?: string;
            };

            router.push(
                completion.visualizerPath ??
                    `/visualizer/${encodeURIComponent(uploadedBlob.pathname)}`,
            );
        } catch (error) {
            console.error("Upload failed:", error);
        }
    };

    return <Upload onComplete={handleUploadComplete} />;
}
