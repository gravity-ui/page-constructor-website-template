export enum DeploymentEnv {
    DEFAULT = 'default',
}

export interface LogFields {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export type DefaultLevels = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG' | 'TRACE';

export interface DefaultLevelsMap {
    [level: number]: DefaultLevels;
}

export interface DefaultLogDescriptor {
    '@fields': LogFields;
    level: DefaultLevels;
    msg: string;
    stackTrace?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}
