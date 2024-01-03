import type {InferGetStaticPropsType, GetStaticProps} from 'next';
import yaml from 'js-yaml';
import path from 'path';
import {readFile} from 'fs/promises';
import {ConfigData} from '../shared/models';
import {preprocess} from '../server/utils';
import {
    NavigationItemType,
    PageConstructor,
    PageConstructorProvider,
} from '@gravity-ui/page-constructor';
import Link from '../ui/components/Link';
import {useMemo} from 'react';

const DEFAULT_PAGE = 'index';
const LOCALES = [{lang: 'en'}, {lang: 'de'}];
const PAGES = ['/', 'pages/page-1', 'pages/page-2', 'page-3'];
const PAGES_DIR = path.resolve('.', 'src/pages-data/en/pages');

const ConstructorPage = ({
    //@ts-ignore
    data: {content, navigation},
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
}): InferGetStaticPropsType<typeof getStaticProps> => {
    const location = useMemo(() => ({Link}), []);
    return (
        <PageConstructorProvider location={location}>
            <PageConstructor content={content} navigation={navigation} />
        </PageConstructorProvider>
    );
};

export const getStaticProps: GetStaticProps = async (context) => {
    const slug = (context.params?.slug as string) || DEFAULT_PAGE;
    const pagePath = Array.isArray(slug) ? slug.join('/') : slug;

    const pagePathFull = path.join(PAGES_DIR, `${pagePath}.yaml`);

    const pageData = await readFile(pagePathFull, {encoding: 'utf-8'});
    const content = (pageData && yaml.load(pageData)) as ConfigData;
    const processed = preprocess(content, {locale: 'en', pageName: pagePath});

    const navigation = {
        header: {
            leftItems: PAGES.map((pageUrl) => ({
                type: NavigationItemType.Link,
                url: pageUrl === '/' ? pageUrl : `/${pageUrl}`,
                text: pageUrl.split('/').pop() || DEFAULT_PAGE,
            })),
        },
    };
    return {
        props: {
            data: {
                content: processed,
                navigation,
            },
        },
    };
};

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

export default ConstructorPage;
