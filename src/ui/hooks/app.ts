import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {configureLang} from '../../i18n';
import {DEFAULT_LOCALE} from '../../shared/constants';

export const useInitialize = () => {
    const {locale = DEFAULT_LOCALE} = useRouter();

    useEffect(() => {
        configureLang(locale);
    }, [locale]);
};
