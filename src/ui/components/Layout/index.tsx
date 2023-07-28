import React, { PropsWithChildren } from 'react';
import block from 'bem-cn-lite';

import './Layout.scss';

const b = block('layout');

const Layout: React.FC<PropsWithChildren<{}>> = ({children}) => (
        <div className={b()}>
            <main className={b('content')}>{children}</main>
        </div>
    );

export default Layout;
