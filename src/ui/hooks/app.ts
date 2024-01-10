import {useEffect} from 'react';
import {configureLang} from '../../i18n';
import {useLocale} from './locale';
import {PageData} from '../../shared/models';

export const useInitialize = ({locale: serverLocale}: PageData) => {
    const locale = useLocale(serverLocale);

    useEffect(() => {
        configureLang(locale);
    }, [locale]);
};
