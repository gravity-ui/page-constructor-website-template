import {DEFAULT_PAGE} from '../../shared/constants';

export const getPageSlugFromName = (pageName: string) =>
    pageName === DEFAULT_PAGE ? [''] : pageName.split('/');
