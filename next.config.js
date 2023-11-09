const { join } = require('path');
const { patchWebpackConfig } = require('next-global-css');

// const cspHeaders = require('./csp');

/** @type {import('next').NextConfig} */
module.exports = {
    output: 'export',
    reactStrictMode: true,
    trailingSlash: true,
    compress: true,
    transpilePackages: ['@doc-tools/components'],
    sassOptions: {
        includePaths: [join(__dirname, 'src/ui/styles')],
    },
    images: {
        unoptimized: true,
    },
    webpack: (config, options) => {
        patchWebpackConfig(config, options);

        config.module.rules.push({
            test: /\.svg$/,
            include: join(__dirname, 'src/ui/assets/images'),
            use: ['url-loader'],
        });

        config.module.rules.push({
            test: /\.svg$/,
            exclude: join(__dirname, 'src/ui/assets/images'),
            use: ['@svgr/webpack'],
        });

        if (!options.isServer) {
            config.resolve.fallback.fs = false;
        }

        return config;
    },
};
