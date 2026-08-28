import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";

import { getBlueprintByBlobKey } from "@/lib/services/upload.service";

interface VisualizerProps {
    params: Promise<{ id: string }>;
}

export default async function VisualizerPage({ params }: VisualizerProps) {
    const { id } = await params;
    const fileBlobKey = decodeURIComponent(id);
    const { userId } = await auth();

    if (!userId) {
        redirect("/");
    }

    const blueprint = await getBlueprintByBlobKey(userId, fileBlobKey);

    if (!blueprint) {
        notFound();
    }

    return (
        <main className="min-h-screen px-5 pb-16 pt-28">
            <div className="mx-auto max-w-5xl">
                <h1 className="text-3xl font-semibold">Your floor plan</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    Uploaded successfully and saved to your Blueprint.
                </p>
                <div className="mt-8 overflow-hidden rounded-lg border bg-white">
                    <img
                        src={blueprint.fileUrl}
                        alt="Uploaded floor plan"
                        className="h-auto max-h-[70vh] w-full object-contain"
                    />
                </div>
            </div>
        </main>
    );
}
