import React, {useState} from 'react';
import {Example, Wrapper} from './Example';
import {Span, DatePicker } from 'neutrino-ui';
import {DatePickerComponent} from './DatePickerComponent';

export function DatePickerPage() {
  const [date, setDate] = useState('');
  // const dateInputRef = React.useRef<HTMLInputElement>(null);
  const handleChangeDate = (value: string) => {
    // console.log('page', value);

    setDate(value);
  }

  return (
    <Wrapper>
      <span>DatePicker</span>
    <div css={{height: 50, overflow: 'hidden', border: '1px #c5c5c5 solid'}}>
      <DatePicker
        css={{width: 250}}
        name="someDate"
        value={date}
        onChangeHandler={handleChangeDate}
        format="DD/MM/YYYY"
        locale="ru"
      >
        <DatePickerComponent />
      </DatePicker>

    </div>


    </Wrapper>
  );
}
