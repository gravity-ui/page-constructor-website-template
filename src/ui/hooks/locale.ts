import {useRouter} from 'next/router';
import {DEFAULT_LOCALE} from '../../shared/constants';

export function useLocale(serverLocale?: string) {
    const {locale = DEFAULT_LOCALE} = useRouter();

    return serverLocale || locale;
}
