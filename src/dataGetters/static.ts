import type {
    GetStaticPaths,
    GetStaticProps,
    GetStaticPropsContext,
    InferGetStaticPropsType,
} from 'next';
import withStaticAppData, {
    DEFAULT_PAGE,
    getPreloadParams,
    getStaticLocale,
} from '../server/middleware/static-app-data';
import {getPageContent, getPageList} from '../server/api/pages-data';
import {Locale} from '../shared/models';

const getPageSlugFromName = (pageName: string) =>
    pageName === DEFAULT_PAGE ? [''] : pageName.split('/');

export const getStaticProps: GetStaticProps = withStaticAppData((context: GetStaticPropsContext) =>
    getPageContent(getPreloadParams(context)),
);

export const getStaticPaths: GetStaticPaths = async () => {
    const locale = getStaticLocale();
    const pages = await getPageList(locale as Locale);
    const paths = pages.map((pageName: string) => {
        return {
            params: {
                slug: getPageSlugFromName(pageName),
            },
        };
    });

    return {
        paths,
        fallback: false,
    };
};

export type PageProps = InferGetStaticPropsType<typeof getStaticProps>;
