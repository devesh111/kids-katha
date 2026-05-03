const nextConfig = {
    images: {
        remotePatterns: [
            new URL("http://localhost/kidskatha/**"),
            { protocol: "http", hostname: "**" },
        ],
    },
};

export default nextConfig;
