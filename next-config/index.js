const {join} = require('path');
const {patchWebpackConfig} = require('next-global-css');

const {getBuildMode, getPreprocessLoader} = require('./utils');
const mode = getBuildMode();
const modeRelatedConfig = require(`./modes/${mode}.js`);

/** @type {import('next').NextConfig} */
module.exports = {
    ...modeRelatedConfig,
    reactStrictMode: true,
    trailingSlash: true,
    compress: true,
    transpilePackages: ['@doc-tools/components'],
    sassOptions: {
        includePaths: [join(__dirname, 'src/ui/styles')],
    },
    webpack: (config, options) => {
        patchWebpackConfig(config, options);

        config.module.rules.push({
            test: /\.svg$/,
            include: join(__dirname, '../src/ui/assets/images'),
            use: ['url-loader'],
        });

        config.module.rules.push({
            test: /\.svg$/,
            exclude: join(__dirname, '../src/ui/assets/images'),
            use: ['@svgr/webpack'],
        });

        if (!options.isServer) {
            config.resolve.fallback.fs = false;
        }

        config.module.rules.push(getPreprocessLoader());

        // api routes are not supported on export mode, need to exclude it from build
        if (mode === 'export') {
            config.module.rules?.push({
                test: /src\/app\/api/,
                loader: 'ignore-loader',
            });
        }

        return config;
    },
};
