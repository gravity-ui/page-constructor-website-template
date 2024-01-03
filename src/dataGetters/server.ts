import {
    GetServerSidePropsContext,
    GetServerSideProps,
    InferGetServerSidePropsType,
} from 'next/types';

import {getPageContent} from '../server/api/pages-data';
import withAppData, {getPreloadParams} from '../server/utils/pages/withAppData';

export const getServerSideProps: GetServerSideProps = withAppData(
    (context: GetServerSidePropsContext) => getPageContent(getPreloadParams(context)),
);

export type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;
