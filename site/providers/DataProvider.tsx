import React, { createContext, useContext } from 'react';
import {DataProviderProps, TComponentItem} from '../types';

const Context = createContext<TComponentItem[]>(null);



export function DataProvider({ children, context }: DataProviderProps) {
    return <Context.Provider value={context}>{children}</Context.Provider>;
}

export const useDataContext = () => useContext(Context);
