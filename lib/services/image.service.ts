export const blobToDataUrl = async (
    blob: Blob,
    contentType?: string | null,
): Promise<string> => {
    if (typeof FileReader === "undefined") {
        const base64Data = Buffer.from(await blob.arrayBuffer()).toString(
            "base64",
        );

        return `data:${contentType || blob.type || "application/octet-stream"};base64,${base64Data}`;
    }

    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (typeof reader.result === "string") {
                resolve(reader.result);
            } else {
                reject(new Error("Failed to read image as a data URL"));
            }
        };
        reader.onerror = () =>
            reject(reader.error ?? new Error("Failed to read image"));
        reader.readAsDataURL(blob);
    });
};

export const fetchAsDataUrl = async (url: string): Promise<string> => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(
            `Failed to fetch image: ${response.status} ${response.statusText}`,
        );
    }

    const blob = await response.blob();
    return blobToDataUrl(blob, response.headers.get("content-type"));
};
