import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "roomify-mlhuk267-dfwu1i.puter.site",
            },
        ],
    },
};

export default nextConfig;
