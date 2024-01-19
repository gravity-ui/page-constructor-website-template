const cspHeaders = require('../csp');

module.exports = {
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
                source: '/sitemap.xml',
                destination: '/server-sitemap.xml',
            },
            {
                source: '/ping',
                destination: '/api/ping',
            },
        ];
    },
};
