"use client";

import Upload from "@/components/Upload";

export default function UploadDemo() {
    return (
        <Upload
            onComplete={(base64Data) => {
                console.log("Upload Complete:", base64Data);
            }}
        />
    );
}
