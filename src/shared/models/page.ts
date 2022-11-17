import {PageContent as ConstructorPageContentBase} from '@gravity-ui/page-constructor';

import {NavigationData, MetaData} from './navigation';

export interface RoutingData {
    hostname: string;
}

export interface DeviceData {
    isMobile: boolean;
    isTablet: boolean;
}

export interface PageContentBase {
    meta?: MetaData;
}

export type PageContent<T> = T & PageContentBase;
export type ConstructorPageContent = PageContent<ConstructorPageContentBase>;
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
