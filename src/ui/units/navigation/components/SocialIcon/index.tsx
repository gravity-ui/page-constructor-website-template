import React from 'react';
import block from 'bem-cn-lite';

import {NavigationSocialItem} from '../../../../../shared/models';

import './SocialIcon.scss';

const b = block('social-icon');

export interface NavigationSocialItemProps extends NavigationSocialItem {
    className?: string;
}

const SocialIcon: React.FC<NavigationSocialItemProps> = ({icon, url, className}) => (
    <a href={url} target="_blank" rel="noopener noreferrer" className={b(null, className)}>
        <img className={b('icon')} src={icon} />
    </a>
);

export default SocialIcon;
