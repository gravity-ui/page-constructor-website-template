import {BREAKPOINTS, useWindowBreakpoint} from '@gravity-ui/page-constructor';
import {useMemo} from 'react';
import {DeviceData} from '../../shared/models';

export const useDevice = (deviceData?: DeviceData) => {
    const breakpoint = useWindowBreakpoint();
    const {isMobile, isTablet} = deviceData || {};

    return useMemo(
        () => ({
            isMobile: isMobile || breakpoint <= BREAKPOINTS.sm,
            isTablet: isTablet || (breakpoint > BREAKPOINTS.sm && breakpoint <= BREAKPOINTS.md),
        }),
        [breakpoint, isMobile, isTablet],
    );
};
