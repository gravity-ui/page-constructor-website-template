const {join} = require('path');
const {patchWebpackConfig} = require('next-global-css');
const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(['@doc-tools/components']);

const cspHeaders = require('./csp');

const plugins = [
    [withSass],
    [withCSS],
    [
        withTM,
        {
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
        },
    ],
];

/** @type {import('next').NextConfig} */
module.exports = withPlugins(plugins, {
    reactStrictMode: true,
    sassLoaderOptions: {
        includePaths: [join(__dirname, 'src/ui/styles')],
    },
    i18n: {
        locales: ['en'],
        defaultLocale: 'en',
        localeDetection: false,
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: cspHeaders,
                    },
                ],
            },
        ];
    },
    async rewrites() {
        return [
            {
                source: '/robots.txt',
                destination: '/api/robots',
            },
            {
                source: '/ping',
                destination: '/api/ping',
            },
        ];
    },
});
