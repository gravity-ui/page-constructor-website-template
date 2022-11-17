/* eslint-disable no-prototype-builtins */
import os from 'os';
import split from 'split2';
import Parse from 'fast-json-parse';
import {LogDescriptor} from 'pino';
import {DefaultLogDescriptor, DefaultLevelsMap, LogFields} from '../models';

const EOL = os.EOL;

const LEVEL_NAME_MAP: DefaultLevelsMap = {
    60: 'ERROR', // fatal
    50: 'ERROR',
    40: 'WARN',
    30: 'INFO',
    20: 'DEBUG',
    10: 'TRACE',
};

const RESERVED_FIELDS = ['msg', 'level', 'levelStr', '@fields', 'stackTrace', 'stack'];

function isPinoLine(line: LogDescriptor): boolean {
    return line.hasOwnProperty('hostname') && line.hasOwnProperty('pid');
}

function convertToPinoLine(obj: LogDescriptor): string {
    const fields: LogFields = {};
    const log: DefaultLogDescriptor = {
        '@fields': fields,
        level: LEVEL_NAME_MAP[obj.level],
        msg: obj.msg,
    };

    if (obj.stack) {
        log.stackTrace = obj.stack;
    }

    Object.keys(obj).forEach((key) => {
        if (RESERVED_FIELDS.indexOf(key) === -1) {
            fields[key] = obj[key];
        }
    });

    return JSON.stringify(log);
}

/**
 * Main function, convert input stream to pino format
 * @returns {Function}
 */
function defaultFormatter() {
    return split((line) => {
        const parsed = new Parse(line);
        const value = parsed.value;

        if (parsed.err || !isPinoLine(value)) {
            return line + EOL;
        } else {
            return convertToPinoLine(value) + EOL;
        }
    });
}

export default defaultFormatter;
