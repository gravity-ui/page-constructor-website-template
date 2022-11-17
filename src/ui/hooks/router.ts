import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

import {getHashFromUrl} from '../utils/url';

export const useHash = () => {
    const router = useRouter();
    const [hash, setHash] = useState(getHashFromUrl(router.asPath));

    useEffect(() => {
        setHash(getHashFromUrl(router.asPath));
    }, [router.asPath]);

    return hash;
};
