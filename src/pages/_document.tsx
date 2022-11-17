import Document, {Html, Head, Main, NextScript} from 'next/document';
import {COMMON_BODY_CLASS} from '../shared/constants';
import {default as config} from '../server/configs/env';
import Favicon from '../ui/components/Favicon';

class MyDocument extends Document {
    static getInitialProps = Document.getInitialProps;

    render() {
        const {assetsPath} = config;

        return (
            <Html>
                <Head>{assetsPath && <Favicon assetsPath={assetsPath} />}</Head>
                <body className={COMMON_BODY_CLASS}>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
