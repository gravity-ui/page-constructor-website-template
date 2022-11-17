import React from 'react';
import {Button, ButtonProps} from '@gravity-ui/page-constructor';

import Link from '../Link';

export interface ButtonLinkProps extends ButtonProps {
    className?: string;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({url, ...props}) => {
    return props.target ? (
        <Button {...props} url={url} />
    ) : (
        <Link href={url}>
            <Button {...props} url={url} />
        </Link>
    );
};

export default ButtonLink;
