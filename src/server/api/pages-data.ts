import yaml from 'js-yaml';

import {preprocess} from '../utils/data/preprocess';
import logger from '../logger';
import {ConfigData, Locale, ConstructorPageContent, NavigationData} from '../../shared/models';
import withCache, {getTTL, MINUTE} from '../utils/cache';
import getData from './pages-data/impl';
import {PreloadParams, RequestError} from '../utils';

export const CONTENT_PAGES_DIR = 'pages';
export const CONTENT_DATA_DIR = 'data';

const NAVIGATION_FILE_NAME = process.env.NAVIGATION_FILE_NAME ?? 'navigation';

const DEFAULT_CACHE_TIME = MINUTE * 5;
const PAGES_CACHE_TIME = Number(process.env.PAGES_CACHE_TIME) || DEFAULT_CACHE_TIME;
const NAVIGATION_CACHE_TIME = Number(process.env.NAVIGATION_CACHE_TIME) || DEFAULT_CACHE_TIME;

export interface ContentResponseType {
    statusCode: 200 | 404 | 500;
    error?: string;
    data?: ConstructorPageContent;
}

export interface ApiResponseType extends Omit<ContentResponseType, 'data'> {
    data?: string;
}

async function getContent(fileName: string, params: PreloadParams) {
    const {statusCode, data, error} = await getData(fileName, params?.locale as Locale);

    if (error) {
        throw new RequestError(error, statusCode);
    }

    try {
        const content = (data && yaml.load(data)) as ConfigData;

        return preprocess(content, params);
    } catch (_error) {
        throw new RequestError(`Error reading data for page ${params?.pageName}`, 500);
    }
}

const getContentCached = async (ttl: number, fileName: string, params: PreloadParams) =>
    withCache<ConfigData>({
        key: `${fileName}-${params.locale}`,
        fn: getContent,
        TTL: ttl,
        useBackup: true,
        logger,
    })(fileName, params);

export const getPageContent = (params: PreloadParams) =>
    getContentCached(
        getTTL(PAGES_CACHE_TIME),
        `${CONTENT_PAGES_DIR}/${params.pageName}`,
        params,
    ) as Promise<ConstructorPageContent>;

export const getNavigationContent = (params: PreloadParams) =>
    getContentCached(
        getTTL(NAVIGATION_CACHE_TIME),
        `${CONTENT_DATA_DIR}/${NAVIGATION_FILE_NAME}`,
        params,
    ) as Promise<NavigationData>;
