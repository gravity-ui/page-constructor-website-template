import type {
    GetStaticPaths,
    GetStaticProps,
    GetStaticPropsContext,
    InferGetStaticPropsType,
} from 'next';
import withStaticAppData, {getPreloadParams} from '../../middleware/static-app-data';
import {getPageContent, getPageList} from '../../api/pages-data';
import {Locale} from '../../../shared/models';
import {getPageSlugFromName} from '../../utils/pages';
import {getStaticLocale} from '../../utils/locale';

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
