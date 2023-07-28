import {
    ButtonProps,
    NavigationData as ConstructorNavigationData,
} from '@gravity-ui/page-constructor';

export enum NavigationItemType {
    Link = 'link',
    Dropdown = 'dropdown',
    Button = 'button',
    Social = 'social',
}

export interface NavigationItemBase {
    text: string;
    icon?: string;
    url?: string;
}

export interface NavigationLinkItem extends NavigationItemBase {
    type: NavigationItemType.Link;
    url: string;
    arrow?: boolean;
    target?: string;
}

export interface NavigationButtonItem extends ButtonProps {
    type: NavigationItemType.Button;
    url: string;
    target?: string;
}

export interface NavigationDropdownItem extends NavigationItemBase {
    type: NavigationItemType.Dropdown;
    items: NavigationLinkItem[];
}

export interface NavigationSocialItem extends Omit<NavigationItemBase, 'text'> {
    type: NavigationItemType.Social;
    icon: string;
    url: string;
}

export type NavigationItem = NavigationLinkItem | NavigationButtonItem | NavigationDropdownItem;

export interface NavigationLogo extends NavigationItemBase {
    icon: string;
}

export interface HeaderData {
    leftItems: NavigationItem[];
    rightItems?: NavigationItem[];
}

export interface FooterColumn {
    title: string;
    links: NavigationItem[];
}

export interface FooterUnderline {
    links?: NavigationItem[];
    copyright?: string;
}

export interface FooterData {
    columns: FooterColumn[];
    social?: NavigationSocialItem[];
    underline?: FooterUnderline;
}

export interface SharingMeta {
    title?: string;
    description?: string;
    image?: string;
    keywords?: string | string[];
    canonical?: string;
}

export interface MetaData {
    title: string;
    description?: string;
    sharing?: SharingMeta;
    noIndex?: boolean;
    metaSchema?: {[x: string]: unknown};
}

export interface NavigationData {
    logo: NavigationLogo;
    header: HeaderData;
    footer: FooterData;
    meta: MetaData;
}

export interface NavigationData extends Omit<ConstructorNavigationData, 'footer'> {
    footer: FooterData;
    meta: MetaData;
}