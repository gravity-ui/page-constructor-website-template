import _ from 'lodash';
import {ConstructorBlock, Lang} from '@gravity-ui/page-constructor';
import {
    transformBlocks as transformConstructorBlocks,
    transformFootnotes,
    yfmTransformer,
} from '@gravity-ui/page-constructor/server';

import {ConfigData, isPageConfig} from '../../../shared/models';
import {BlockType} from '../../../shared/models/constructor';
import {PreloadParams} from './preload';

/**
 * Function processes page or navigation configs data text with typograf and yfm text transformers.
 * Applies before data caching
 * @param  {object} content - page or navigation config data
 * @param  {params} params - text processing params such as lang, etc.
 * @return {object} - processed page or navigation config data
 */
export function preprocess(content: ConfigData, params: PreloadParams) {
    const lang = params.locale as Lang;

    if (isPageConfig(content)) {
        if (content.blocks) {
            transformBlocks(content.blocks, lang);
        }

        if (content.footnotes) {
            content.footnotes = transformFootnotes(content.footnotes, lang);
        }
    }

    return content;
}

// extends page-constructor typograf config
const config = {
    [BlockType.CustomBlock]: {
        fields: ['title'],
        transformer: yfmTransformer,
    },
};

function transformBlocks(blocks: ConstructorBlock[], lang: Lang) {
    return transformConstructorBlocks(blocks, lang, config);
}
