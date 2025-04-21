import {Fragment} from 'react';
import {useRouter} from 'next/router';

import RoutingContext from '../../../shared/context/RoutingContext';

import DeviceContext from '../../../shared/context/DeviceContext';
import Meta from '../../../ui/components/Meta';
import ErrorPage from '../../../ui/components/ErrorPage';
import Layout from '../../../ui/components/Layout';

import CSRFContext from '../../../ui/context/CSRFContext';
import {PageData, ServerDetectedProps} from '../../../shared/models';

export interface PageProps
    extends Omit<PageData, 'pageContent' | keyof ServerDetectedProps>,
        Required<Pick<PageData, keyof ServerDetectedProps>> {}

export const Page = ({
    meta,
    locale,
    routingData,
    deviceData,
    errorCode,
    csrfToken,
    children,
}: React.PropsWithChildren<PageProps>) => {
    const {asPath} = useRouter();

    if (errorCode) {
        return <ErrorPage code={errorCode || 500} />;
    }

    return (
        <CSRFContext.Provider value={csrfToken}>
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
        </CSRFContext.Provider>
    );
};
