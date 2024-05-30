const nextConfig = {
    webpack: (config) => {
        return config;
    },
    experimental: {
        esmExternals: "loose", // <-- add this
        serverComponentsExternalPackages: ["mongoose"]
    }
}
module.exports = nextConfig;