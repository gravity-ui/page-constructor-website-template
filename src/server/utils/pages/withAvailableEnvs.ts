import {GetServerSidePropsContext} from 'next';
import {Env} from '../../../shared/models';
import {getEnv} from '../env';
import {FetchPageData} from './withAppData';

const appEnv = getEnv();

export default function withAvailableEnvs<T>(
    availableEnvs: Env[],
    fetchPageData: FetchPageData<T>,
) {
    return async (context: GetServerSidePropsContext) => {
        if (availableEnvs.includes(appEnv)) {
            return fetchPageData(context);
        }
        return Promise.reject({statusCode: 404});
    };
}
