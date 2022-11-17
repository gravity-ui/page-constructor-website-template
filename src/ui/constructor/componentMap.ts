import {BlockType} from '../../shared/models/constructor';
import CustomBlock from './blocks/CustomBlock';

const blocks = {
    [BlockType.CustomBlock]: CustomBlock,
};

export default {blocks};
