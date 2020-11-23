import React, {useState} from 'react';
import {ThemeProvider} from '@emotion/react';
import {Wrapper} from './Example';
import {DatePicker, baseTheme} from 'neutrino-ui';
import {DateRangePicker} from 'neutrino-ui/lib/sealed';
import {DatePickerComponent} from './DatePickerComponent';

export function DatePickerPage() {
  const [date, setDate] = useState('');
  //const [number, setNumber] = React.useState(500000);
  const handleChangeDate = (value: string) => {
    setDate(value);
  };

  // const handleChangeRange = (value: number, e?: React.ChangeEvent<HTMLInputElement>) => {
  //   setNumber(value);
  // };

  return (
    <Wrapper>
      <span>DatePicker</span>

      <ThemeProvider theme={baseTheme}>
        <div>
          <DatePicker
            css={{width: 450}}
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
        <div css={{marginTop: 20}}>
          <span>DateRangePicker</span>
          <div css={{width: 300}}>
            <DateRangePicker />
          </div>
        </div>
      </ThemeProvider>
    </Wrapper>
  );
}
