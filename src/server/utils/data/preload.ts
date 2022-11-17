import {NavigationData, PageContentBase} from '../../../shared/models';
import {getNavigationContent} from '../../api/pages-data';
import logger from '../../logger';
import {getErrorCode, getStatusCode} from '../common';

type PageSlug = string | string[];

const INDEX_PAGE_FILE_NAME = process.env.INDEX_PAGE_FILE_NAME || 'index';

export function getPageName(slug?: PageSlug) {
    let pageName = INDEX_PAGE_FILE_NAME;

    if (Array.isArray(slug) && slug.length) {
        pageName = slug.join('/');
    } else if (slug && typeof slug === 'string') {
        pageName = slug;
    }

    return pageName === '/' ? INDEX_PAGE_FILE_NAME : pageName;
}

function handleNavigationData(data: PromiseSettledResult<NavigationData>) {
    if (data.status === 'rejected') {
        logger.info('NAVIGATION_DATA_LOADING_ERROR');

        throw new Error(data.reason);
    } else {
        return data.value;
    }
}

function handlePageContent<T extends PageContentBase>(
    data: PromiseSettledResult<T>,
    {pageName}: PreloadParams,
) {
    if (data.status === 'rejected') {
        logger.info({reason: data.reason, pageName}, 'PAGE_DATA_LOADING_ERROR');

        return {
            errorCode: getErrorCode(getStatusCode(data) || 500),
        };
    } else {
        const {meta = {}, ...pageContent} = data.value;

        return {meta, pageContent};
    }
}

export interface PreloadParams {
    locale: string;
    pageName: string;
    pageReferer?: string;
}

export default async function preload<T extends PageContentBase>(
    params: PreloadParams,
    fetchPageData: () => Promise<T>,
) {
    const [navigationLoadingResult, pageLoadingResult] = await Promise.allSettled([
        getNavigationContent(params) as Promise<NavigationData>,
        fetchPageData(),
    ]);

    const navigationData = handleNavigationData(navigationLoadingResult);
    const {meta: pageMeta, ...pageContent} = handlePageContent<T>(pageLoadingResult, params);
    const meta = pageMeta || navigationData.meta;

    return {
        ...pageContent,
        meta,
        navigationData,
    };
}
