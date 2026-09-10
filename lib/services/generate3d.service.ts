import { ROOMIFY_RENDER_PROMPT } from "@/lib/constants/constant";
import { fetchAsDataUrl } from "@/lib/services/image.service";

interface Generate3DViewParams {
    sourceImage: string;
    projectId?: string | null;
}

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

export const generate3DView = async ({ sourceImage }: Generate3DViewParams) => {
    const dataUrl = sourceImage.startsWith("data:")
        ? sourceImage
        : await fetchAsDataUrl(sourceImage);

    const base64Data = dataUrl.split(",")[1];
    const mimeType = dataUrl.split(";")[0].split(":")[1];

    if (!mimeType || !base64Data) {
        throw new Error("Invalid source image payload");
    }

    const puter = (globalThis as typeof globalThis & { puter?: BrowserPuter })
        .puter;

    if (!puter) {
        throw new Error("Puter is not available in the browser");
    }

    const response = await puter.ai.txt2img(ROOMIFY_RENDER_PROMPT, {
        provider: "gemini",
        model: "gemini-2.5-flash-image-preview",
        input_image: base64Data,
        input_image_mime_type: mimeType,
        ratio: { w: 1024, h: 1024 },
    });

    const renderedImageUrl = (response as HTMLImageElement).src;

    if (!renderedImageUrl) {
        throw new Error("The 3D render did not return an image");
    }

    return {
        renderedImage: renderedImageUrl,
        renderedPath: renderedImageUrl,
    };
};
