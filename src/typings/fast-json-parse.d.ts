declare module 'fast-json-parse' {
    import {LogDescriptor} from 'pino';

    export default class Parse {
        value: LogDescriptor;
        err?: Error;

        constructor(line: String);
    }
}
