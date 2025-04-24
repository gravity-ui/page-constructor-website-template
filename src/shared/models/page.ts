import {
    NavigationData as ConstructorNavigaitonData,
    PageContent as ConstructorPageContentBase,
} from '@gravity-ui/page-constructor';

export interface RoutingData {
    hostname?: string;
}

export interface DeviceData {
    isMobile?: boolean;
    isTablet?: boolean;
}

export interface LocaleData {
    lang: string;
}

export interface MetaData {
    title: string;
    description?: string;
}

export interface PageContentBase {
    meta?: MetaData;
}

export type PageContent<T> = T & PageContentBase;
export type ConstructorPageContent = PageContent<ConstructorPageContentBase>;
export type NavigationData = PageContent<ConstructorNavigaitonData>;
export type ConfigData = ConstructorPageContent | NavigationData;

export interface ServerDetectedProps {
    locale?: string;
    routingData?: RoutingData;
    deviceData?: DeviceData;
}

export interface PageData<T extends PageContentBase = ConstructorPageContent>
    extends ServerDetectedProps {
    pageContent: T;
    navigationData: NavigationData;
    meta: MetaData;
    csrfToken: string;
    errorCode: number | null;
}

export function isPageConfig(config: ConfigData): config is ConstructorPageContent {
    return 'blocks' in config;
}
