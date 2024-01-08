import {
    GetServerSidePropsContext,
    GetServerSideProps,
    InferGetServerSidePropsType,
} from 'next/types';

import {getPageContent} from '../server/api/pages-data';
import withServerAppData, {getPreloadParams} from '../server/utils/pages/withServerAppData';

export const getServerSideProps: GetServerSideProps = withServerAppData(
    (context: GetServerSidePropsContext) => getPageContent(getPreloadParams(context)),
);

export type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;
