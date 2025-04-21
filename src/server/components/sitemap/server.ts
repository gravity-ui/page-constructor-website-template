import {
    GetServerSideProps,
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
} from 'next/types';
import {getServerSideSitemapLegacy} from 'next-sitemap';

import {getPageList} from '../../api/pages-data';
import {Locale} from '../../../shared/models';
import {DEFAULT_LOCALE, DEFAULT_PAGE, SITE_URL} from '../../../shared/constants';

import {RequestError} from '../../utils';

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext,
) => {
    const {locale} = context;
    const currentLocale = locale || DEFAULT_LOCALE;
    const pages = await getPageList(currentLocale as Locale);

    if (!SITE_URL) {
        throw new RequestError('No SITE_URL', 500);
    }

    return getServerSideSitemapLegacy(
        context,
        pages.map((page: String) => {
            const pathname = page === DEFAULT_PAGE ? '' : page;

            return {
                loc: `${SITE_URL}/${pathname}`,
            };
        }),
    );
};

export type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;
