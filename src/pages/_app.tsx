import type {AppProps} from 'next/app';

import {configureLang} from '../i18n/index';
import {useInitialize} from '../ui/hooks/app';
import ErrorBoundary from '../ui/components/ErrorBoundary/ErrorBoundary';
import {ThemeProvider} from '@gravity-ui/uikit';

import '@gravity-ui/uikit/styles/styles.css';

import '../ui/styles/variables.scss';
import '../ui/styles/globals.css';

configureLang();

function CustomApp({Component, pageProps}: AppProps) {
    useInitialize(pageProps);

    return (
        <ThemeProvider>
            <ErrorBoundary>
                <Component {...pageProps} />
            </ErrorBoundary>
        </ThemeProvider>
    );
}

export default CustomApp;
