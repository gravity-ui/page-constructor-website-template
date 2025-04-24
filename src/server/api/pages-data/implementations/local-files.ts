import {readFile, readdir, stat} from 'fs/promises';
import {join, resolve} from 'path';
import {Locale} from '../../../../shared/models';
import {ApiResponseType} from '..';

import {cutFileExtension, getPageConfigFilename, isNodeError} from '../utils';

const CONTENT_DIR = 'content';
const NOT_FOUND_ERROR_CODE = 'ENOENT';

const getFilesList = async (root: string, fileNameTransformer?: (name: string) => string) => {
    const results: string[] = [];

    async function traversal(path: string) {
        const subpaths = await readdir(path);

        for await (const subpath of subpaths) {
            const absoulutePath = join(path, subpath);

            if ((await stat(absoulutePath)).isDirectory()) {
                await traversal(absoulutePath);
            } else {
                const fileName = fileNameTransformer
                    ? fileNameTransformer(absoulutePath)
                    : absoulutePath;
                results.push(fileName);
            }
        }
    }

    await traversal(root);

    return results;
};

export async function get(fileName: string, locale: Locale): Promise<ApiResponseType> {
    const pageConfigPath = resolve(CONTENT_DIR, getPageConfigFilename(fileName, locale));

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
    const pagesRoot = join(CONTENT_DIR, locale, 'pages');
    const fileNameTransformer = (fileName: string) =>
        cutFileExtension(fileName.replace(`${pagesRoot}/`, ''));

    return getFilesList(pagesRoot, fileNameTransformer);
}
