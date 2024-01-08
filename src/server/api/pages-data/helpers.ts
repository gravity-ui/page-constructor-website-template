import {readdir, stat} from 'fs/promises';
import {join} from 'path';

export const getPageConfigFilename = (path: string, locale: string): string =>
    `${locale}/${path}.yaml`;

export const cutFileExtension = (name: string) => name.split('.')[0];

export const isNodeError = (error: unknown): error is NodeJS.ErrnoException =>
    error instanceof Error;

export const getFilesList = async (
    root: string,
    fileNameTransformer?: (name: string) => string,
) => {
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
