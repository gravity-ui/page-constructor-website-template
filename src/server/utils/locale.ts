import {DEFAULT_LOCALE} from '../../shared/constants';

export const getStaticLocale = () => process.env.EXPORT_LOCALE || DEFAULT_LOCALE;
