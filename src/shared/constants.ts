import {Locale} from './models';

export const DEFAULT_LOCALE = Locale.En;
export const DEFAULT_PAGE = 'index';
export const COMMON_BODY_CLASS = 'g-root g-root_theme_light';
export const LOGGER_PRETTY_OPTIONS = {
    colorize: true,
    ignore: 'pid,hostname,name',
    translateTime: 'HH:MM:ss Z',
};
export const SITE_URL = process.env.SITE_URL;
