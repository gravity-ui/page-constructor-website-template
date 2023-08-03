import {Fragment} from 'react';
import {useRouter} from 'next/router';
import {useWindowBreakpoint} from '@gravity-ui/page-constructor';

import RoutingContext from '../../../shared/context/RoutingContext';
import {DEFAULT_LOCALE} from '../../../shared/constants';

import DeviceContext from '../../../shared/context/DeviceContext';
import Meta from '../../../ui/components/Meta';
import ErrorPage from '../../../ui/components/ErrorPage';
import Layout from '../../../ui/components/Layout';

import BreakpointContext from '../../../ui/context/BreakpointContext';
import CSRFContext from '../../../ui/context/CSRFContext';
import {PageData} from '../../../shared/models';

export type PageProps = Omit<PageData, 'pageContent'>;

export const Page: React.FC<PageProps> = ({
    meta,
    routingData,
    deviceData,
    errorCode,
    csrfToken,
    children,
}) => {
    const {locale = DEFAULT_LOCALE, asPath} = useRouter();
    const breakpoint = useWindowBreakpoint();

    if (errorCode) {
        return <ErrorPage code={errorCode || 500} />;
    }

    return (
        <CSRFContext.Provider value={csrfToken}>
            <BreakpointContext.Provider value={breakpoint}>
                <DeviceContext.Provider value={deviceData}>
                    <RoutingContext.Provider value={routingData}>
                        <Layout key={locale}>
                            {errorCode ? (
                                <ErrorPage code={errorCode} />
                            ) : (
                                <Fragment key={asPath}>
                                    <Meta data={meta} />
                                    {children}
                                </Fragment>
                            )}
                        </Layout>
                    </RoutingContext.Provider>
                </DeviceContext.Provider>
            </BreakpointContext.Provider>
        </CSRFContext.Provider>
    );
};
