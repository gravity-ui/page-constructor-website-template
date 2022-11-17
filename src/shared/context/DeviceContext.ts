import React from 'react';
import {DeviceData} from '../models';

export default React.createContext<DeviceData>({isMobile: false, isTablet: false});
