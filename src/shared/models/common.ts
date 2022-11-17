export enum Locale {
    En = 'en',
}

export type LocaleContextType = {
    lang: Locale;
    langName: string;
};

export enum Env {
    Dev = 'dev',
    Preprod = 'preprod',
    Prod = 'prod',
}
