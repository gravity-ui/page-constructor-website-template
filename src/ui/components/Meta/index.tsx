import React from 'react';
import Head from 'next/head';

import {MetaData} from '../../../shared/models';

export interface MetaPropsType {
    data: MetaData;
}

const Meta: React.FC<MetaPropsType> = ({data: {title, description}}) => {
    return (
        <Head>
            <title>{title}</title>
            {description && <meta name="description" content={description} key="description" />}
        </Head>
    );
};

export default Meta;
