import {I18N} from '@gravity-ui/i18n';
import {Lang as UIKitLang, configure as gravityConfigure} from '@gravity-ui/uikit';

import * as en from './en';

export enum Locale {
    En = 'en',
}

export const i18n = new I18N();

Object.keys(en).forEach((key) =>
    i18n.registerKeyset(
        Locale.En,
        key,
        (en as Record<string, Record<string, string | string[]>>)[key],
    ),
);

export const configureLang = (locale: string = Locale.En) => {
    i18n.setLang(Locale.En);
    gravityConfigure({lang: locale as UIKitLang});
};

const getKeyset = (keyset: string) => i18n.keyset(keyset);
export default getKeyset;
