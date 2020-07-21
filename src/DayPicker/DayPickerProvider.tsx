import React, {createContext, useCallback, useEffect, useContext, useMemo} from 'react';
import {parseFormat} from './utils';

interface IDayPickerContext {
    formatConfig: {inputs: Map<string, {length: number}>, delimiter: string}
}

const DayPickerContext = createContext<IDayPickerContext | undefined>(undefined);

export function DayPickerProvider(props: any) {
    const { config, value, ...restProps } = props;
    const { format = 'DD.MM.YYYY' } = config;
    const formatConfig = parseFormat(format);

    const ctxValue = useMemo<IDayPickerContext>(() => ({formatConfig}), [formatConfig]);

    return <DayPickerContext.Provider value={ctxValue} {...restProps}/>
}

export const useDayPicker = () => {
    const ctx = useContext(DayPickerContext);
    return ctx;
}
