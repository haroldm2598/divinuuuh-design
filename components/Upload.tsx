"use client";
import { useAuth } from "@clerk/nextjs";
import { CheckCircle, ImageIcon, UploadIcon } from "lucide-react";
import { ChangeEvent, DragEvent, useState } from "react";

import {
    PROGRESS_INTERVAL_MS,
    PROGRESS_STEP,
    REDIRECT_DELAY_MS,
} from "@/lib/constants/constant";

type UploadProps = {
    onComplete?: (base64Data: string) => void;
};

export default function Upload({ onComplete }: UploadProps) {
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [progress, setProgress] = useState(0);
    const { isSignedIn } = useAuth();

    const processFile = (selectedFile: File) => {
        if (!isSignedIn) return;

        setFile(selectedFile);
        setProgress(0);

        const reader = new FileReader();
        reader.onload = () => {
            const base64Data = reader.result;
            if (typeof base64Data !== "string") return;

            const progressInterval = setInterval(() => {
                setProgress((currentProgress) => {
                    const nextProgress = Math.min(
                        currentProgress + PROGRESS_STEP,
                        100,
                    );

                    if (nextProgress === 100) {
                        clearInterval(progressInterval);
                        setTimeout(
                            () => onComplete?.(base64Data),
                            REDIRECT_DELAY_MS,
                        );
                    }

                    return nextProgress;
                });
            }, PROGRESS_INTERVAL_MS);
        };
        reader.readAsDataURL(selectedFile);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!isSignedIn) return;

        const selectedFile = event.target.files?.[0];
        if (selectedFile) processFile(selectedFile);
    };

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (!isSignedIn) return;
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);

        if (!isSignedIn) return;

        const selectedFile = event.dataTransfer.files[0];
        if (selectedFile) processFile(selectedFile);
    };

    return (
        <div className="upload">
            {!file ? (
                <div
                    className={`dropzone ${isDragging ? "is-dragging" : ""}`}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        className="drop-input"
                        accept=".jpg,.jpeg,.png"
                        disabled={!isSignedIn}
                        onChange={handleChange}
                    />

                    <div className="drop-content">
                        <div className="drop-icon">
                            <UploadIcon size={20} />
                        </div>

                        <p>
                            {isSignedIn
                                ? "Click to upload or just drag and drop"
                                : "Sign in or sign up with Account to upload"}
                        </p>

                        <p className="help">Maximum file size 50MB</p>
                    </div>
                </div>
            ) : (
                <div className="upload-status">
                    <div className="status-content">
                        <div className="status-icon">
                            {progress === 100 ? (
                                <CheckCircle className="check" />
                            ) : (
                                <ImageIcon className="image" />
                            )}
                        </div>

                        <h3>{file.name}</h3>

                        <div className="progress">
                            <div
                                className="bar"
                                style={{ width: `${progress}%` }}
                            />

                            <p className="status-text">
                                {progress < 100
                                    ? "Analyzing Floor Plan..."
                                    : "Redirecting...."}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
