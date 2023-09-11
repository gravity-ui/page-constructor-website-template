import React from 'react';
import {block} from '../../../utils/cn';

import {Title} from '@gravity-ui/page-constructor';

import './CustomBlock.scss';

export interface CustomBlockProps {
    title: string;
    text: string;
}

const b = block('custom-block');

const CustomBlock: React.FC<CustomBlockProps> = ({title, text}) => (
    <Title className={b()} title={title} subtitle={text} />
);

export default CustomBlock;
