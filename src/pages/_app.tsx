import type {AppProps} from 'next/app';

import {configureLang} from '../i18n/index';
import {useInitialize} from '../ui/hooks/app';
import ErrorBoundary from '../ui/components/ErrorBoundary/ErrorBoundary';

import '@gravity-ui/uikit/styles/styles.css';

import '../ui/styles/variables.scss';
import '../ui/styles/globals.css';

configureLang();

function MyApp({Component, pageProps}: AppProps) {
    useInitialize();

    return (
        <ErrorBoundary>
            <Component {...pageProps} />
        </ErrorBoundary>
    );
}

export default MyApp;
