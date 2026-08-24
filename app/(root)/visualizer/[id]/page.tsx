interface VisualizerProps {
    params: Promise<{ id: string }>;
}

export default async function VisualizerPage({ params }: VisualizerProps) {
    const { id: visualizedId } = await params;

    return (
        <div className="min-h-screen mt-28 ml-5 text-2xl">
            Welcome to Visualized Page ID: {visualizedId}
        </div>
    );
}
