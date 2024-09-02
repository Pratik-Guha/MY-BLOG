import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "raw.githubusercontent.com",
                port: "",
                pathname: "/Pratik-Guha/test-blog/main/images/**",
            },
        ],
    },
};

export default nextConfig;
