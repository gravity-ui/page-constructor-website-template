import {
    InferGetServerSidePropsType,
    GetServerSidePropsContext,
    GetServerSideProps,
} from 'next/types';
import {PageConstructor, PageConstructorProvider} from '@gravity-ui/page-constructor';

import {PageData} from '../shared/models';
import componentMap from '../ui/constructor/componentMap';
import Link from '../ui/components/Link';

import {Page} from '../ui/containers/Page/Page';
import {getPageContent} from '../server/api/pages-data';
import withAppData, {getPreloadParams} from '../server/utils/pages/withAppData';

const projectSettings = {
    disableCompress: true,
};

const ConstructorPage: InferGetServerSidePropsType<typeof getServerSideProps> = ({
    pageContent,
    navigationData,
    routingData,
    deviceData,
    ...pageProps
}: PageData) => {
    return (
        <Page
            {...pageProps}
            routingData={routingData}
            deviceData={deviceData}
            navigationData={navigationData}
        >
            <PageConstructorProvider
                location={{...routingData, Link}}
                isMobile={deviceData.isMobile}
                projectSettings={projectSettings}
            >
                <PageConstructor
                    custom={componentMap}
                    content={pageContent}
                    navigation={navigationData}
                />
            </PageConstructorProvider>
        </Page>
    );
};

export const getServerSideProps: GetServerSideProps = withAppData(
    (context: GetServerSidePropsContext) => getPageContent(getPreloadParams(context)),
);

export default ConstructorPage;
