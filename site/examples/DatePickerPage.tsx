import React, {useState} from 'react';
import {Wrapper} from './Example';
import {DatePicker} from 'neutrino-ui';
import {DatePickerComponent} from './DatePickerComponent';

export function DatePickerPage() {
  const [date, setDate] = useState('');
  const handleChangeDate = (value: string) => {
    setDate(value);
  };

  return (
    <Wrapper>
      <span>DatePicker</span>

      <div>
        <DatePicker
          css={{width: 250}}
          name="someDate"
          value={date}
          onChangeHandler={handleChangeDate}
          format="DD/MM/YYYY"
          locale="ru"
          // minDate="15/09/2020"
          // maxDate="30/10/2020"
        >
          <DatePickerComponent />
        </DatePicker>
      </div>
    </Wrapper>
  );
}
