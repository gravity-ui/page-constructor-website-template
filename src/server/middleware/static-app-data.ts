import {GetStaticPropsContext} from 'next/types';
import {configureLang} from '../../i18n';
import preload from '../utils/data/preload';
import {ConstructorPageContent, PageContentBase} from '../../shared/models';
import {DEFAULT_PAGE} from '../../shared/constants';
import {getStaticLocale} from '../utils/locale';
import {getPageNameFromSlug} from '../utils/pages';

const locale = getStaticLocale();

export type FetchPageData<T> = (context: GetStaticPropsContext) => Promise<T>;

export function getPreloadParams(context: GetStaticPropsContext) {
    const {params: {slug = DEFAULT_PAGE} = {}} = context;
    const pageName = getPageNameFromSlug(slug);

    return {locale, pageName};
}

export default function withStaticAppData<T extends PageContentBase = ConstructorPageContent>(
    fetchPageData: FetchPageData<T>,
) {
    return async function getStaticProps(context: GetStaticPropsContext) {
        const {params: {slug = DEFAULT_PAGE} = {}} = context;
        const pageName = getPageNameFromSlug(slug);
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
