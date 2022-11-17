import React from 'react';
import block from 'bem-cn-lite';

import {NavigationData} from '../../../../../shared/models';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './Layout.scss';

const b = block('layout');

export interface LayoutProps {
    navigationData: NavigationData;
}

const Layout: React.FC<LayoutProps> = ({children, navigationData}) => {
    const {header, footer, logo} = navigationData;

    return (
        <div className={b()}>
            {header && <Header data={navigationData.header} logo={logo} />}
            <main className={b('content')}>{children}</main>
            {footer && <Footer data={navigationData.footer} logo={logo} />}
        </div>
    );
};

export default Layout;
