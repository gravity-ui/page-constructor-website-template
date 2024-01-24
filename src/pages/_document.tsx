import React from 'react';
import Document, {Html, Head, Main, NextScript} from 'next/document';
import {COMMON_BODY_CLASS} from '../shared/constants';
import {default as config} from '../server/configs/env';
import Favicon from '../ui/components/Favicon';
import {addIntegrity} from '../server/utils/integrity';

type DocumentFiles = Parameters<Head['getScripts']>[0];

class CustomHead extends Head {
    getScripts(files: DocumentFiles) {
        const scripts = super.getScripts(files);

        return addIntegrity(scripts);
    }
}

class CustomNextScript extends NextScript {
    getScripts(files: DocumentFiles) {
        const scripts = super.getScripts(files);

        return addIntegrity(scripts);
    }
}

class CustomDocument extends Document {
    static getInitialProps = Document.getInitialProps;

    render() {
        const {assetsPath} = config;

        return (
            <Html>
                <CustomHead>{assetsPath && <Favicon assetsPath={assetsPath} />}</CustomHead>
                <body className={COMMON_BODY_CLASS}>
                    <Main />
                    <CustomNextScript />
                </body>
            </Html>
        );
    }
}

export default CustomDocument;
