import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "avatar.iran.liara.run",
            },
        ],
    },
    experimental: {
        dynamicIO: true,
    },
}

export default nextConfig