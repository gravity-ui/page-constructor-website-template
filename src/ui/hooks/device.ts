import {BREAKPOINTS} from '@gravity-ui/page-constructor';
import {useContext} from 'react';
import DeviceContext from '../../shared/context/DeviceContext';
import BreakpointContext from '../context/BreakpointContext';

export const useIsMobile = (breakpoint = BREAKPOINTS.sm) => {
    const {isMobile} = useContext(DeviceContext);
    const currentBreakpoint = useContext(BreakpointContext);

    return isMobile || currentBreakpoint <= breakpoint;
};
