import _ from 'lodash';
import {Block, ConstructorBlock} from '@gravity-ui/page-constructor';
import {contentTransformer, yfmTransformer} from '@gravity-ui/page-constructor/server';

import {ConfigData, isPageConfig} from '../../../shared/models';
import {BlockType} from '../../../shared/models/constructor';
import {PreloadParams} from './preload';
import {Lang} from '@gravity-ui/uikit';

/**
 * Function processes page or navigation configs data text with typograf and yfm text transformers.
 * Applies before data caching
 * @param  {object} content - page or navigation config data
 * @param  {params} params - text processing params such as lang, etc.
 * @return {object} - processed page or navigation config data
 */
export function preprocess(content: ConfigData, params: PreloadParams) {
    const lang = params.locale as Lang;

    if (isPageConfig(content) && content.blocks) {
        return {
            ...content,
            blocks: transformBlocks(content.blocks, lang),
        };
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
    return contentTransformer({
        content: {blocks},
        options: {
            lang,
            customConfig: config,
        },
    }).blocks as Block[];
}
