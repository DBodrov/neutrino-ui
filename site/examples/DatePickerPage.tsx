import React, { useState } from 'react';
import { Example, Wrapper } from './Example';
import { DayPicker } from 'neutrino-ui';

export function DatePickerPage() {
    const [date, setDate] = useState('20.07.2020');
    const dayPickerCfg = {format: 'DD/MM/YYYY'}
    return (
        <Wrapper>
            <span>DatePicker</span>
            <DayPicker onChange={(d:string) => setDate(d)} value={date} name="date" config={dayPickerCfg}/>
        </Wrapper>
    );
}
