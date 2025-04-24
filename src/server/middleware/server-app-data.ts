import {GetServerSidePropsContext} from 'next/types';
import {configureLang} from '../../i18n';
import {DEFAULT_LOCALE} from '../../shared/constants';
import logger from '../logger';
import getRoutingData, {getDeviceData} from '../utils/common';
import csrf, {ReqWithCSRF} from '../utils/csrf';
import preload, {PreloadParams, getPageName} from '../utils/data/preload';
import {ConstructorPageContent, PageContentBase} from '../../shared/models';

export type FetchPageData<T> = (context: GetServerSidePropsContext) => Promise<T>;

export const getPreloadParams = ({
    locale = DEFAULT_LOCALE,
    req,
    query: {slug} = {},
}: GetServerSidePropsContext): PreloadParams => ({
    locale,
    pageName: getPageName(slug),
    pageReferer: req.headers.referer,
});

export default function withServerAppData<T extends PageContentBase = ConstructorPageContent>(
    fetchPageData: FetchPageData<T>,
) {
    return async function getServerSideProps(context: GetServerSidePropsContext) {
        const {locale = DEFAULT_LOCALE, res, req} = context;
        configureLang(locale);

        try {
            await csrf(req, res);

            const preloadParams = getPreloadParams(context);
            const data = await preload<T>(preloadParams, () => fetchPageData(context));

            if (data.errorCode) {
                res.statusCode = data.errorCode;
            }

            return {
                props: {
                    ...data,
                    routingData: getRoutingData(req),
                    deviceData: getDeviceData(req),
                    csrfToken: (req as unknown as ReqWithCSRF).csrfToken(),
                },
            };
        } catch (err) {
            logger.error(err, 'DATA_LOADING_ERROR');

            return {
                props: {
                    errorCode: 500,
                },
            };
        }
    };
}
