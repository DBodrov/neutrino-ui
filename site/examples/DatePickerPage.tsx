import React, {useState} from 'react';
import {ThemeProvider, css} from '@emotion/react';
import {Wrapper, Example} from './Example';
import {DatePicker, baseTheme, createTheme, Switch} from 'neutrino-ui';
import {DateRangePicker} from 'neutrino-ui/lib/sealed';
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

export function DatePickerPage() {
  const [date, setDate] = useState('');
  const [dateRange, setDateRange] = useState<[string?, string?]>([]);
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');
  //const [number, setNumber] = React.useState(500000);
  const handleChangeDate = (value: string) => {
    setDate(value);
  };

  const handleChangeRange = (range: [string?, string?]) => {
    // console.log(range);
    setDateRange(range);
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
