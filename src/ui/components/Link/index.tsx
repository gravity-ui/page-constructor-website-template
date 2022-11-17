import React, {Fragment} from 'react';
import NextLink from 'next/link';
import {RouterLinkProps} from '@gravity-ui/page-constructor';

const Link: React.FC<RouterLinkProps> = ({href, children}) => (
    <NextLink href={href} passHref>
        {/*
            Link nested functional component ref passing problem fix:
            https://github.com/vercel/next.js/issues/7915
        */}
        <Fragment>{children}</Fragment>
    </NextLink>
);

export default Link;
