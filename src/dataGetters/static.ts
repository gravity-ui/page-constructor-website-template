import type {
    GetStaticPaths,
    GetStaticProps,
    GetStaticPropsContext,
    InferGetStaticPropsType,
} from 'next';
import withAppStaticData, {
    DEFAULT_PAGE,
    getPreloadParams,
    getStaticLocale,
} from '../server/utils/pages/withStaticAppData';
import {getPageContent} from '../server/api/pages-data';
import {list as listPages} from '../server/api/pages-data/local';

const getPageSlugFromName = (pageName: string) =>
    pageName === DEFAULT_PAGE ? [''] : pageName.split('/');

export const getStaticProps: GetStaticProps = withAppStaticData((context: GetStaticPropsContext) =>
    getPageContent(getPreloadParams(context)),
);

export const getStaticPaths: GetStaticPaths = async () => {
    const locale = getStaticLocale();
    const pages = await listPages(locale);
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
