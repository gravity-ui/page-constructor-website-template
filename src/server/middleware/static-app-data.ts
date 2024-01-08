import {GetStaticPropsContext} from 'next/types';
import {configureLang} from '../../i18n';
import preload from '../utils/data/preload';
import {ConstructorPageContent, PageContentBase} from '../../shared/models';
import {DEFAULT_LOCALE} from '../../shared/constants';

export type FetchPageData<T> = (context: GetStaticPropsContext) => Promise<T>;

export const DEFAULT_PAGE = 'index';

export const getStaticLocale = () => process.env.EXPORT_LOCALE || DEFAULT_LOCALE;

const locale = getStaticLocale();

export function getPreloadParams(context: GetStaticPropsContext) {
    const {params: {slug = DEFAULT_PAGE} = {}} = context;
    const pageName = Array.isArray(slug) ? slug.join('/') : slug;

    return {locale, pageName};
}

export default function withStaticAppData<T extends PageContentBase = ConstructorPageContent>(
    fetchPageData: FetchPageData<T>,
) {
    return async function getStaticProps(context: GetStaticPropsContext) {
        const {params: {slug = DEFAULT_PAGE} = {}} = context;
        const pageName = Array.isArray(slug) ? slug.join('/') : slug;
        configureLang(locale);

        const data = await preload<T>({locale, pageName}, () => fetchPageData(context));

        return {
            props: {
                ...data,
                locale,
            },
        };
    };
}
