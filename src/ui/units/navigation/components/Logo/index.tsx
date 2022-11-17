import React from 'react';
import Link from 'next/link';
import block from 'bem-cn-lite';

import {NavigationLogo} from '../../../../../shared/models';

import './Logo.scss';

const b = block('logo');

export interface LogoProps extends NavigationLogo {
    className?: string;
}

const Logo: React.FC<LogoProps> = ({icon, text, className}) => (
    <Link href="/" passHref>
        <div className={b(null, className)}>
            {icon && <img className={b('icon')} src={icon} />}
            <span className={b('text')}>{text}</span>
        </div>
    </Link>
);

export default Logo;
