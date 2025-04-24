/* eslint-disable no-param-reassign */
const {join} = require('path');
const {patchWebpackConfig} = require('next-global-css');

const WebpackAssetsManifest = require('webpack-assets-manifest');

const {getBuildMode, getPreprocessLoader} = require('./utils');
const mode = getBuildMode();
const modeRelatedConfig = require(`./modes/${mode}.js`);

const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
module.exports = {
    ...modeRelatedConfig,
    reactStrictMode: true,
    trailingSlash: true,
    compress: true,
    transpilePackages: [
        '@gravity-ui/uikit',
        '@gravity-ui/page-constructor',
        '@gravity-ui/components',
        'swiper',
    ],
    sassOptions: {
        includePaths: [join(__dirname, 'src/ui/styles')],
    },
    webpack: (config, options) => {
        const {isServer} = options;

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

        if (!isServer) {
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

        // adding SRI
        if (isProd && !isServer) {
            config.output.crossOriginLoading = 'anonymous';
            config.plugins.push(
                new WebpackAssetsManifest({
                    integrity: true,
                    integrityHashes: ['sha384'],
                }),
            );
        }

        return config;
    },
};
