import {Grid, Row, Col} from '@gravity-ui/page-constructor';
import React, {Fragment} from 'react';
import block from 'bem-cn-lite';

import {
    FooterData,
    NavigationLogo,
    FooterColumn,
    FooterUnderline,
    NavigationSocialItem,
} from '../../../../../shared/models';
import Logo from '../Logo';
import NavigationItem from '../NavigationItem';

import './Footer.scss';

const b = block('footer');

export interface FooterProps {
    logo: NavigationLogo;
    data: FooterData;
}

type LeftProps = Pick<FooterData, 'social'> & Pick<FooterProps, 'logo'>;

const Left: React.FC<LeftProps> = ({logo, social}) => (
    <Col sizes={{all: 12, md: 4}} className={b('column')}>
        <Logo {...logo} className={b('logo')} />
        {social && (
            <div className={b('social')}>
                {social.map((item: NavigationSocialItem) => (
                    <NavigationItem key={item.url} data={item} />
                ))}
            </div>
        )}
    </Col>
);

const Right: React.FC<{data: FooterColumn[]}> = ({data}) => (
    <Fragment>
        {data.map(({links, title}) => (
            <Col key={title} className={b('column')} sizes={{all: 6, sm: 3, md: 2}}>
                <h5 className={b('column-title')}>{title}</h5>
                {links.map((link) => (
                    <NavigationItem key={link.text} data={link} className={b('column-link')} />
                ))}
            </Col>
        ))}
    </Fragment>
);

const Underline: React.FC<FooterUnderline> = ({links, copyright}) => (
    <Col sizes={{all: 12}} className={b('underline')}>
        {links && (
            <div className={b('underline-links')}>
                {links.map((link) => (
                    <NavigationItem key={link.text} data={link} className={b('underline-link')} />
                ))}
            </div>
        )}
        {copyright && <div className={b('underline-copyright')}>{copyright}</div>}
    </Col>
);

const Footer: React.FC<FooterProps> = ({data, logo}) => {
    if (!data) {
        return null;
    }

    return (
        <footer className={b()}>
            <Grid>
                <Row>
                    <Left logo={logo} social={data.social} />
                    <Right data={data.columns} />
                </Row>
                {data?.underline && (
                    <Row>
                        <Underline {...data.underline} />
                    </Row>
                )}
            </Grid>
        </footer>
    );
};

export default Footer;
