import type {GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType} from 'next';
import withAppStaticData, {getPreloadParams} from '../server/utils/pages/withStaticAppData';
import {getPageContent} from '../server/api/pages-data';

const LOCALES = [{lang: 'en'}, {lang: 'de'}];
const PAGES = ['/', 'pages/page-1', 'pages/page-2', 'page-3'];

export const getStaticProps: GetStaticProps = withAppStaticData((context: GetStaticPropsContext) =>
    getPageContent(getPreloadParams(context)),
);

export async function getStaticPaths() {
    const paths = {
        paths: PAGES.map((data) =>
            LOCALES.map((locale) => ({
                params: {
                    slug: data.split('/'),
                    locale,
                },
            })),
        ).flat(),
        fallback: false,
    };

    return paths;
}

export type PageProps = InferGetStaticPropsType<typeof getStaticProps>;
