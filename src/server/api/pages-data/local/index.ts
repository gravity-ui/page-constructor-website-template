import {readFile} from 'fs/promises';
import {resolve, join} from 'path';
import {Locale} from '../../../../shared/models';
import {ApiResponseType} from '../../pages-data';

import {getPageConfigFilename, isNodeError, cutFileExtension, getFilesList} from '../helpers';
import {PAGES_DATA_DIR} from './constants';

const NOT_FOUND_ERROR_CODE = 'ENOENT';

export async function get(fileName: string, locale: Locale): Promise<ApiResponseType> {
    const pageConfigPath = resolve(PAGES_DATA_DIR, getPageConfigFilename(fileName, locale));

    try {
        const data = await readFile(pageConfigPath, {encoding: 'utf-8'});

        return {statusCode: 200, data};
    } catch (error) {
        if (isNodeError(error) && error.code === NOT_FOUND_ERROR_CODE) {
            return {statusCode: 404, error: `${fileName} not found for locale ${locale}`};
        }

        return {statusCode: 500, error: (error as Error).message};
    }
}

export async function list(locale: string) {
    const pagesRoot = join(PAGES_DATA_DIR, locale, 'pages');
    const fileNameTransformer = (fileName: string) =>
        cutFileExtension(fileName.replace(`${pagesRoot}/`, ''));

    return getFilesList(pagesRoot, fileNameTransformer);
}
