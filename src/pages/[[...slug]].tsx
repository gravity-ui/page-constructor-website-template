import {PageConstructor, PageConstructorProvider} from '@gravity-ui/page-constructor';

import {PageData} from '../shared/models';
import componentMap from '../ui/constructor/componentMap';
import Link from '../ui/components/Link';

import {Page} from '../ui/containers/Page/Page';
import {PageProps} from '../server/components/construtor/static';
import {useDevice} from '../ui/hooks/device';
import {useRoutingData} from '../ui/hooks/router';
import {useLocale} from '../ui/hooks/locale';

// Next.js conditional getServerSideProps usage workaround https://github.com/vercel/next.js/discussions/15674
// TODO: fix with migration from 'pages' to 'app' routing type

// #!if BUILD_MODE === "export"
export {getStaticProps, getStaticPaths} from '../server/components/construtor/static';
// #!endif

// #!if BUILD_MODE === "default"
export {getServerSideProps} from '../server/components/construtor/server';
// #!endif

const projectSettings = {
    disableCompress: true,
};

const ConstructorPage: PageProps = ({
    pageContent,
    navigationData,
    routingData: serverRoutingData,
    deviceData: serverDeviceData,
    locale: serverLocale,
    ...pageProps
}: PageData) => {
    const deviceData = useDevice(serverDeviceData);
    const routingData = useRoutingData(serverRoutingData);
    const locale = useLocale(serverLocale);

    return (
        <Page
            {...pageProps}
            locale={locale}
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

export default ConstructorPage;
