const nextConfig = {
    basePath: '',
    assetPrefix:"",
    webpack: (config) => {
        config.experiments = { ...config.experiments, topLevelAwait: true };
        return config;
    },
    experimental: {
        esmExternals: "loose", // <-- add this
        serverComponentsExternalPackages: ["mongoose"]
    }
}
module.exports = nextConfig;