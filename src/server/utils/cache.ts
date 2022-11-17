import NodeCache from 'node-cache';
import pino from 'pino';

import {getEnv} from './env';

export const MINUTE = 60;
export const HOUR = MINUTE * 60;
export const serverCache = new NodeCache({useClones: false});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FunctionParams = Array<any>;

export interface WithCacheParams<TData> {
    key: string;
    fn: (...params: FunctionParams) => Promise<TData>;
    TTL?: number;
    useBackup?: boolean;
    fallback?: TData;
    logger?: pino.Logger;
}
/**
 * Wraps passed function with cache logic.
 * New function will cache data obtained with fn and and return this data
 * or cached value in case of fn fail.
 *
 * @param  {string} key - identifier to keep data in cache.
 * @param  {Function} fn - function for data fetch.
 * @param  {number} TTL - standard time to live in seconds. 0 = infinity
 * @param  {boolean} useBackup - if function fails, last successful result will be returned even if TTL is overpassed.
 * @param  {object} fallback - data to return in case of fetch error.
 * @param  {object} logger - logger instance
 * @return {Function} - function that wraps fn with cache logic.
 */

export default function withCache<TData>(props: WithCacheParams<TData>) {
    const {key, fn, TTL = HOUR, useBackup = false, fallback, logger} = props;
    const cacheKey = `req-${key}`;
    const cacheTimestampKey = `${cacheKey}-timestamp`;

    return async function (...params: FunctionParams): Promise<TData> {
        let data = serverCache.get(cacheKey) as TData;

        if (!data || (useBackup && !serverCache.get(cacheTimestampKey))) {
            try {
                data = await fn(...params);
                serverCache.set(cacheKey, data, useBackup ? 0 : TTL);

                if (useBackup) {
                    serverCache.set(cacheTimestampKey, Date.now(), TTL);
                }
            } catch (ex) {
                if (!data || !useBackup) {
                    if (logger) {
                        logger.error(ex, `${fn.name || cacheKey} failed`);
                    }

                    if (fallback) {
                        return fallback;
                    }

                    throw ex;
                }
            }
        }

        return data;
    };
}

export const getTTL = (cacheTime: number) => {
    return getEnv() === 'prod' ? cacheTime : MINUTE / 60;
};
