const isDev = process.env.NODE_ENV === 'development';

const YOUTUBE = 'www.youtube.com';
const ASSETS_STORAGE = 'https://storage.yandexcloud.net';

const policiesConfig = {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'", isDev ? "'unsafe-eval'" : ''],
    'script-src-elem': ["'self'", "'unsafe-inline'"],
    'style-src': ["'self'", "'unsafe-inline'"],
    'object-src': ["'self'", 'data:'],
    'style-src-elem': ["'self'", "'unsafe-inline'"],
    'style-src-attr': ["'self'", "'unsafe-inline'"],
    'img-src': ["'self'", ASSETS_STORAGE, 'data:'],
    'font-src': ["'self'"],
    'child-src': ["'self'", YOUTUBE],
    'frame-src': ["'self'", YOUTUBE],
    'frame-ancestors': ["'self'"],
    'connect-src': ["'self'"],
};

const getCSP = (config) =>
    Object.entries(config)
        .map(([name, values]) => {
            const policies = values.map((v) => (Array.isArray(v) ? v.join(' ') : v)).join(' ');

            return `${name} ${policies};`;
        })
        .join(' ');

module.exports = getCSP(policiesConfig);
