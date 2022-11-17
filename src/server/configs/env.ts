import {getEnv} from '../utils/env';

const {default: common} = require('./common');
const env = require(`./${getEnv()}`).default;

export default {
    ...common,
    ...env,
} as Config;

export interface Config {
    appName: string;
    prettyPrintLogs?: boolean;
    loggingLevel?: string;
    assetsPath?: string;
}
