import React, {useState} from 'react';
import {ThemeProvider, css} from '@emotion/react';
import {Wrapper, Example} from './Example';
import {baseTheme, createTheme, Switch, InputPhone} from 'neutrino-ui';
import {DateRangePicker, DatePicker} from 'neutrino-ui/lib/sealed';
import {DatePickerComponent} from './DatePickerComponent';

const darkTheme = createTheme({
  colors: {
    textColors: {
      text: '#fff',
    },
    mainColors: {
      primary: '#289df5',
      secondary: '#FF7800',
    },
    pageElementsColors: {
      border: '#313d4f',
      body: '#3a3d43',
      formElements: '#273142',
      formElementsActive: '#313D4F',
      activeBorder: '#289df5',
      selectedItem: '#313D4F',
    },
  },
  typography: {
    h5: {color: '#fff', fontWeight: 'normal'},
    p: {color: '#fff'},
    span: {color: '#fff'},
  },
});

const exampleDaterange = `
import React, {useState} from 'react';
import {css} from '@emotion/react';
import {DateRangePicker} from 'neutrino-ui/lib/sealed';

/** somewhere in app... */
const [dateRange, setDateRange] = useState<[string?, string?]>([]);
//...

const handleChangeRange = (range: [string?, string?]) => {
  setDateRange(range);
};

<DateRangePicker
  name="range"
  onChangeHandler={handleChangeRange}
  value={dateRange}
  inputCss={css({borderRadius: 8})}
  calendarCss={css({borderRadius: 8})}
/>
`.trim();

const datePickerCss = css`
  height: 48px;
  border-radius: 8px;
  margin-bottom: 4px;
`;

const calendarButtonStyles: React.CSSProperties = {
  color: 'green',
  backgroundColor: 'gray',
  borderRadius: '8px',
};
//({height: 48, borderRadius: 4, marginBottom: 4});

// const validate = (dateString: string) => {
//   const [day, month, year] = dateString.split('.').map(Number);
//   const date = new Date(year, month, day);
//   const monthIsValid = month <= 12 && month > 0;
//   const yearFormatIsValid = String(year).length === 4;
//   const dayIsValid = date.getDate() === day;

//   const isComplete = zeroPad(day, 2).length === 2 && zeroPad(month, 2).length === 2 && yearFormatIsValid;
//   return {isValid: dayIsValid && monthIsValid && yearFormatIsValid, isComplete};
// };

//01.34.6789

export function DatePickerPage() {
  const [date, setDate] = useState('');
  const [phone, setPhone] = useState('');
  const [dateRange, setDateRange] = useState<[string?, string?]>([]);
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');
  //const [number, setNumber] = React.useState(500000);

  const handleChangePhone = (phone: string) => {
    setPhone(phone);
  };

  const handleChangeDate = (value: string) => {
    const splittedDate = value.split('.');
    const isComplete =
      splittedDate[0]?.length === 2 && splittedDate[1]?.length === 2 && splittedDate[2]?.length === 4;
    if (splittedDate.length === 3 && isComplete) {
      console.log('start validation date', value);
    }
    setDate(value);
  };

  const handleChangeRange = (range: [string?, string?]) => {
    // console.log(range);
    setDateRange(range);
  };

  const handleBlur = (e?: React.FocusEvent) => {
    console.log('blur', date);
  };

  // const handleChangeRange = (value: number, e?: React.ChangeEvent<HTMLInputElement>) => {
  //   setNumber(value);
  // };

  return (
    <Wrapper>
      <span>DatePicker</span>
      <div css={{marginBottom: 50}}>
        <Switch on={theme === 'dark'} onToggle={() => setTheme(t => (t === 'light' ? 'dark' : 'light'))} />
        {`${theme} theme`}
      </div>

      <ThemeProvider theme={theme === 'dark' ? darkTheme : baseTheme}>
        <div>
          <div css={{marginBottom: 16}}>
            <label css={{color: 'gray', fontSize: 12}}>Mobile</label>
            <InputPhone
              name="phoneNumber"
              // ref={phoneRef}
              countryCode="+7"
              // css={phoneStyle}
              onChange={handleChangePhone}
              value={phone}
              placeholder="(___) ___-__-__"
            />
            <input type="text" />
          </div>
          <DatePicker
            name="someDate"
            value={date}
            onChangeHandler={handleChangeDate}
            onBlur={handleBlur}
            format="DD.MM.YYYY"
            locale="ru"
            width={600}
            inputStyles={datePickerCss}
            calendarStyles={css({borderRadius: 4})}
            calendarButtonStyles={calendarButtonStyles}
            minDate="15.09.1980"
            maxDate="30.10.2023"
          />
          <span css={{fontSize: 10, color: 'red'}}>Validation</span>
        </div>
        <div css={{marginTop: 20}}>
          <span>DateRangePicker</span>
          <Example code={exampleDaterange} />
          <div css={{width: 300}}>
            <DateRangePicker
              name="range"
              onChangeHandler={handleChangeRange}
              value={dateRange}
              inputCss={css({borderRadius: 8})}
              calendarCss={css({borderRadius: 8})}
            />
          </div>
        </div>
      </ThemeProvider>
    </Wrapper>
  );
}
