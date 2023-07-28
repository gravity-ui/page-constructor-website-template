import React, {ReactElement, ReactNode} from 'react';
import RouterLink from 'next/link';
import {RouterLinkProps} from '@gravity-ui/page-constructor';

export enum LinkType {
    Router = 'router',
}

export const INTERNAL_LINK_EXCEPTIONS_TEST = /\/docs/;

const isLinkElement = (children: ReactNode) => {
    if (typeof children !== 'object' || children === null || !('type' in children)) {
        return false;
    }

    return children.type === 'a';
};

const Link: React.FC<RouterLinkProps> = ({href, children}) => {
    if (INTERNAL_LINK_EXCEPTIONS_TEST.test(href)) {
        return isLinkElement(children) ? (
            React.cloneElement(children as ReactElement, {href})
        ) : (
            <React.Fragment>{children}</React.Fragment>
        );
    } else {
        const CustomLink = React.forwardRef((props, ref) =>
            React.cloneElement(children as ReactElement, {...props, ref}),
        );

        return (
            <RouterLink href={href} passHref>
                <CustomLink />
            </RouterLink>
        );
    }
};

export default Link;