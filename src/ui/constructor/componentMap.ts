import {BlockType} from '../../shared/models/constructor';
import CustomBlock from './blocks/CustomBlock';

const componentsMap = {
    blocks: {
        [BlockType.CustomBlock]: CustomBlock,
    },
};

export default componentsMap;
