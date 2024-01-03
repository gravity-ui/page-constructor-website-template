import {GetStaticPropsContext} from 'next/types';
import {configureLang} from '../../../i18n';
import {DEFAULT_LOCALE} from '../../../shared/constants';
import logger from '../../logger';
import preload from '../data/preload';
import {ConstructorPageContent, PageContentBase} from '../../../shared/models';

export type FetchPageData<T> = (context: GetStaticPropsContext) => Promise<T>;

const DEFAULT_PAGE = 'index';

export function getPreloadParams(context: GetStaticPropsContext) {
    const {locale = DEFAULT_LOCALE, params: {slug = DEFAULT_PAGE} = {}} = context;
    const pageName = Array.isArray(slug) ? slug.join('/') : slug;

    return {locale, pageName};
}

export default function withAppStaticData<T extends PageContentBase = ConstructorPageContent>(
    fetchPageData: FetchPageData<T>,
) {
    return async function getStaticProps(context: GetStaticPropsContext) {
        const {locale = DEFAULT_LOCALE, params: {slug = DEFAULT_PAGE} = {}} = context;
        const pageName = Array.isArray(slug) ? slug.join('/') : slug;
        configureLang(locale);

        try {
            const data = await preload<T>({locale, pageName}, () => fetchPageData(context));

            return {
                props: {
                    ...data,
                    routingData: {hostname: ''},
                    deviceData: {},
                },
            };
        } catch (err) {
            logger.error(err, 'DATA_LOADING_ERROR');

            return {
                props: {
                    errorCode: 500,
                },
            };
        }
    };
}
