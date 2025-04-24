import {
    GetServerSideProps,
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
} from 'next/types';

import {getPageContent} from '../../api/pages-data';
import withServerAppData, {getPreloadParams} from '../../middleware/server-app-data';

export const getServerSideProps: GetServerSideProps = withServerAppData(
    (context: GetServerSidePropsContext) => getPageContent(getPreloadParams(context)),
);

export type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;
