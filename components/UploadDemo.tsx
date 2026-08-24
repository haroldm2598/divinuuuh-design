"use client";

import Upload from "@/components/Upload";
import { redirect } from "next/navigation";

export default function UploadDemo() {
    const handleUploadComplete = async (base64Data: string) => {
        const newId = Date.now().toString();

        redirect(`/visualizer/${newId}`);
    };

    return (
        <Upload
            onComplete={handleUploadComplete}
            // onComplete={(base64Data) => {
            //     console.log("Upload Complete:", base64Data);
            // }}
        />
    );
}
