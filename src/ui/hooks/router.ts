import {useRouter} from 'next/router';
import {useEffect, useMemo, useState} from 'react';

import {getHashFromUrl} from '../utils/url';
import {RoutingData} from 'src/shared/models';

export const useHash = () => {
    const router = useRouter();
    const [hash, setHash] = useState(getHashFromUrl(router.asPath));

    useEffect(() => {
        setHash(getHashFromUrl(router.asPath));
    }, [router.asPath]);

    return hash;
};

export const useClientHostname = () => {
    const {asPath} = useRouter();
    const origin =
        typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';

    return `${origin}${asPath}`;
};

export const useRoutingData = (routingData?: RoutingData) => {
    const clientHostname = useClientHostname();

    return useMemo(
        () => ({
            ...(routingData || {}),
            hostname: routingData?.hostname || clientHostname,
        }),
        [clientHostname, routingData],
    );
};
