import pino, {Logger} from 'pino';

import {default as config} from '../configs/env';
import {LOGGER_PRETTY_OPTIONS} from '../../shared/constants';
import {checkIsDev} from '../utils/env';
import {pinoDefaultFormatter} from './formatters';

let logger: Logger;

const isDev = checkIsDev();
const options = {
    enabled: !process.env.DISABLE_LOGGING,
    name: config.appName,
    safe: true,
    level: process.env.LOGGING_LEVEL || config.loggingLevel || 'debug',
    serializers: {
        error: pino.stdSerializers.err,
    },
    prettyPrint: config.prettyPrintLogs && LOGGER_PRETTY_OPTIONS,
};

if (config.prettyPrintLogs || isDev) {
    logger = pino(options);
} else {
    const pinoCloud = pinoDefaultFormatter();
    pinoCloud.pipe(process.stdout);
    logger = pino(options, pinoCloud);
}

export default logger;
