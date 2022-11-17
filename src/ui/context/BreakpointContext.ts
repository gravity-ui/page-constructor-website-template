import {BREAKPOINTS} from '@gravity-ui/page-constructor';
import React from 'react';

export type BreakpointContext = number;

export default React.createContext<BreakpointContext>(BREAKPOINTS.sm);
