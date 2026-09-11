type UploadImageToHostingInput = {
    hosting: "vercel-blob";
    url: string;
    projectId: string;
    label: "source" | "rendered";
    blobKey?: string;
};

type HostedImage = {
    url: string;
    blobKey?: string;
};

type CreateBlueprintUploadInput = {
    clerkId: string;
    sourceImage: string;
    sourceBlobKey: string;
    renderedImage?: string | null;
};

type BrowserPuter = {
    ai: {
        txt2img: (
            prompt: string,
            options: {
                provider: string;
                model: string;
                input_image: string;
                input_image_mime_type: string;
                ratio: { w: number; h: number };
            },
        ) => Promise<HTMLImageElement>;
    };
};

type UploadCompletionBody = {
    url?: unknown;
    pathname?: unknown;
    renderedImage?: unknown;
};
