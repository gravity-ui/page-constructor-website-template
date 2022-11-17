import React from 'react';
import {RoutingData} from '../models';

export default React.createContext<RoutingData>({hostname: ''});
