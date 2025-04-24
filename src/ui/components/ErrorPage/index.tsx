import React from 'react';
import {block} from '../../utils/cn';

import Image from 'next/image';

import Meta from '../Meta';
import i18n from '../../../i18n';

import Icon404 from '../../../ui/assets/images/404.svg';
import Icon500 from '../../../ui/assets/images/500.svg';

import './ErrorPage.scss';

const b = block('error-page');

interface ErrorPageProps {
    code?: number;
}

const i18nK = i18n('error');

const getPublicCode = (code: number) => (code === 404 ? 404 : 500);

const ErrorPage = ({code = 500}: ErrorPageProps) => {
    const publicCode = getPublicCode(code);
    const title = i18nK(`label_meta-title-${publicCode}`);
    const imgSrc = code === 404 ? Icon404 : Icon500;

    return (
        <div className={b({code: String(code)})}>
            <Meta data={{title}} />
            <Image src={imgSrc as unknown as string} alt="" width="220" height="220" />
            <h1 className={b('code')}>{i18nK('label_title-code', {code: publicCode})}</h1>
            <h2 className={b('title')}>{i18nK(`label_title-${publicCode}`)}</h2>
            <p className={b('description')}>
                {publicCode === 404 ? (
                    <a href="/">{i18nK('label_link-main')}</a>
                ) : (
                    <React.Fragment>
                        {i18nK('label_error-description-open')}
                        <a onClick={() => window.location.reload()}>
                            {i18nK('label_description-link')}
                        </a>
                        {i18nK('label_error-description-close')}
                    </React.Fragment>
                )}
            </p>
        </div>
    );
};
export default ErrorPage;
