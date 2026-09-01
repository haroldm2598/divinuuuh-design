"use client";

import Upload from "@/components/Upload";
import { upload } from "@vercel/blob/client";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function UploadDemo() {
    const router = useRouter();
    const { isSignedIn } = useAuth();

    const handleUploadComplete = async (file: File) => {
        try {
            if (!isSignedIn) {
                throw new Error("Please sign in again before uploading.");
            }

            const uploadedBlob = await upload(file.name, file, {
                access: "public",
                handleUploadUrl: "/api/upload",
                contentType: file.type,
            });

            router.push(
                `/visualizer/${encodeURIComponent(uploadedBlob.pathname)}`,
            );
        } catch (error) {
            console.error("Upload failed:", error);
        }
    };

    return <Upload onComplete={handleUploadComplete} />;
}
