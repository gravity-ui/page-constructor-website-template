import {
    PageContent as ConstructorPageContentBase,
    NavigationData as ConstructorNavigaitonData,
} from '@gravity-ui/page-constructor';

export interface RoutingData {
    hostname: string;
}

export interface DeviceData {
    isMobile: boolean;
    isTablet: boolean;
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

export interface PageData<T extends PageContentBase = ConstructorPageContent> {
    pageContent: T;
    navigationData: NavigationData;
    routingData: RoutingData;
    deviceData: DeviceData;
    meta: MetaData;
    csrfToken: string;
    errorCode: number | null;
}

export function isPageConfig(config: ConfigData): config is ConstructorPageContent {
    return 'blocks' in config;
}
