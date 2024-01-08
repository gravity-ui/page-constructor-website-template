import {
    GetServerSidePropsContext,
    GetServerSideProps,
    InferGetServerSidePropsType,
} from 'next/types';

import {getPageContent} from '../server/api/pages-data';
import withServerAppData, {getPreloadParams} from '../server/middleware/server-app-data';

export const getServerSideProps: GetServerSideProps = withServerAppData(
    (context: GetServerSidePropsContext) => getPageContent(getPreloadParams(context)),
);

export type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;
