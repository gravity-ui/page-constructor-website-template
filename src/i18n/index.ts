import {I18N} from '@gravity-ui/i18n';
import {configure as uikitConfigure, Lang as UIKitLang} from '@gravity-ui/uikit';
import {configure as pcConfigure, Lang as PCLang} from '@gravity-ui/page-constructor';

import * as en from './en';

export enum Locale {
    En = 'en',
}

export const i18n = new I18N();

i18n.setLang(Locale.En);

Object.keys(en).forEach((key) =>
    i18n.registerKeyset(
        Locale.En,
        key,
        (en as Record<string, Record<string, string | string[]>>)[key],
    ),
);

export const configureLang = (locale: string = Locale.En) => {
    uikitConfigure({lang: locale as UIKitLang});
    pcConfigure({lang: locale as PCLang});
};

const getKeyset = (keyset: string) => i18n.keyset(keyset);
export default getKeyset;
