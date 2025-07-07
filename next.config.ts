import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'entekas.com',
            },
            {
                protocol: 'https',
                hostname: 'cdn.entekas.io',
            },
            {
                protocol: 'https',
                hostname: 'upload.wikimedia.org',
            },
            {
                protocol: 'https',
                hostname: 'cdn.dsmcdn.com',
            },
            {
                protocol: 'https',
                hostname: 'www.amazon.com',
            },
            {
                protocol: 'https',
                hostname: 'www.hepsiburada.com',
            },
            {
                protocol: 'https',
                hostname: 'democustomer.entekas.com',
            },
            {
                protocol: 'https',
                hostname: 'api.dicebear.com',
            },
            {
                protocol: 'https',
                hostname: 'erjaerdwf2fec7ocbcly1evhqr.entekas.com',
            },
            {
                protocol: 'http',
                hostname: 'erjaerdwf2fec7ocbcly1evhqr.entekas.com',
            },
            {
                protocol: 'https',
                hostname: 'opencart.micayazilim.web.tr',
            },
            {
                protocol: 'https',
                hostname: 'via.placeholder.com',
            }
        ],
    },
};

export default nextConfig;
