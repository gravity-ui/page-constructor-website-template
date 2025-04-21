import React from 'react';
import {block} from '../../utils/cn';

import './Layout.scss';

const b = block('layout');

const Layout = ({children}: React.PropsWithChildren) => (
    <div className={b()}>
        <div className={b('content')}>{children}</div>
    </div>
);

export default Layout;
