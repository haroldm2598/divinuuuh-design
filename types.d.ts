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
