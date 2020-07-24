import React from 'react';
import { Input } from '../Input';
import { DayPickerProvider } from './DayPickerProvider';
import { PickerInput } from './PickerInput';

export function DayPicker(props: any) {
    const { name, onChange } = props;

    return (
        <DayPickerProvider {...props}>
            <PickerInput />
        </DayPickerProvider>
    );
}
