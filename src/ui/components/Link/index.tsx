import React, {ReactElement} from 'react';
import RouterLink from 'next/link';
import {RouterLinkProps} from '@gravity-ui/page-constructor';

const Link = ({href, children}: RouterLinkProps) => {
    const CustomLink = React.forwardRef((props, ref) =>
        React.cloneElement(children as ReactElement, {...props, ref}),
    );

    CustomLink.displayName = 'CustomLink';

    return (
        <RouterLink href={href} passHref legacyBehavior>
            <CustomLink />
        </RouterLink>
    );
};

export default Link;
