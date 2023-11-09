import type {InferGetStaticPropsType, GetStaticProps} from 'next';
import yaml from 'js-yaml';
import path from 'path';
import {readFile} from 'fs/promises';
import {ConfigData} from '../shared/models';
import {preprocess} from '../server/utils';
import {PageConstructor} from '@gravity-ui/page-constructor';

const LOCALES = [{lang: 'en'}, {lang: 'de'}];
const PAGES = ['index', 'page-3', 'pages/page-1', 'pages/page-2'];
const PAGES_DIR = path.resolve('.', 'src/pages-data/en/pages');

const ConstructorPage = ({
    //@ts-ignore
    data,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
}): InferGetStaticPropsType<typeof getStaticProps> => {
    return (
        <html>
            <body>
                <PageConstructor content={data} />
            </body>
        </html>
    );
};

export const getStaticProps: GetStaticProps = async (context) => {
    const slug = context.params?.slug as string;
    const pagePath = Array.isArray(slug) ? slug.join('/') : slug;
    const pagePathFull = path.join(PAGES_DIR, `${pagePath}.yaml`);

    const pageData = await readFile(pagePathFull, {encoding: 'utf-8'});
    const content = (pageData && yaml.load(pageData)) as ConfigData;
    const processed = preprocess(content, {locale: 'en', pageName: pagePath});

    return {
        props: {
            data: processed,
        },
    };
};

export async function getStaticPaths() {
    return {
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
}

export default ConstructorPage;
