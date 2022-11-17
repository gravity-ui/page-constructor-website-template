import {NextRouter} from 'next/router';

export function removeHash(router: NextRouter) {
    if (router) {
        const [url] = router.asPath.split('#');
        router.replace(url);
    } else {
        window.location.hash = '';
    }
}

export const getHashFromUrl = (url: string) => {
    if (url && url.includes('#')) {
        return url.split('#')[1];
    }

    return '';
};
