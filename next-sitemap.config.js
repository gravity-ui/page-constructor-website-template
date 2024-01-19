const SITE_URL = process.env.SITE_URL || 'https://test.com';
const policy = process.env.ALLOW_ROBOTS ? 'allow' : 'disallow';

module.exports = {
    siteUrl: SITE_URL,
    generateRobotsTxt: true,
    changefreq: 'daily',
    exclude: ['/server-sitemap.xml'],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                [`${policy}`]: '/',
            },
        ],
    },
};
