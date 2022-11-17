import React from 'react';

export type CSRFContext = string;

export default React.createContext<CSRFContext>('');
