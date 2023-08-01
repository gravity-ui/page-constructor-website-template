import {readFile} from 'fs/promises';
import {resolve} from 'path';
import {Locale} from '../../../../shared/models';
import {ApiResponseType} from '../../pages-data';

import {getPageConfigFilename} from '../helpers';
import {PAGES_DATA_DIR} from './constants';

export default async function getData(fileName: string, locale: Locale): Promise<ApiResponseType> {
    const pageConfigPath = resolve(PAGES_DATA_DIR, getPageConfigFilename(fileName, locale));
    const data = await readFile(pageConfigPath, {encoding: 'utf-8'});

    return {statusCode: 200, data};
}
