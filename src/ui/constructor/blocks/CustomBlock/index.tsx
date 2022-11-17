import React from 'react';
import block from 'bem-cn-lite';

import {BlockHeader} from '@gravity-ui/page-constructor';

import './CustomBlock.scss';

export interface CustomBlockProps {
    title: string;
    text: string;
}

const b = block('custom-block');

const CustomBlock: React.FC<CustomBlockProps> = ({title, text}) => (
    <BlockHeader className={b()} title={title} description={text} />
);

export default CustomBlock;
