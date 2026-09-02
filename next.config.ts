import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    allowedDevOrigins: ["astound-antler-flattered.ngrok-free.dev"],
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "roomify-mlhuk267-dfwu1i.puter.site",
            },
        ],
    },
    experimental: {
        authInterrupts: true,
    },
};

export default nextConfig;
