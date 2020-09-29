import React from 'react';
import {css} from '@emotion/core';
import {ThemeProvider} from 'emotion-theming';
import {Wrapper, Example, Label} from './Example';
import {createTheme, SimpleSelect} from 'neutrino-ui';

const theme = createTheme({
  colors: {
    pageElementsColors: {
      formElements: '#325b72',
      selectedItem: '#293676',
      border: '#0FC0FC',
    },
    textColors: {
      text: '#fff',
    },
  },
  typography: {
    span: {
      color: '#fff',
      fontSize: '14px',
    },
  },
});

const exampleDefault = `
import {SimpleSelect} from 'neutrino-ui';

const optionsList = [
  {id: -1, value: 'Все'},
  {id: 1, value: 'Площадка 1'},
  {id: 2, value: 'Площадка 2'},
  {id: 3, value: 'Площадка 3'},
  {id: 4, value: 'Площадка 4'},
  {id: 5, value: 'Площадка 5'},
  {id: 6, value: 'Площадка 6'},
  {id: 7, value: 'Площадка 7'},
  {id: 8, value: 'Площадка 8'},
  {id: 9, value: 'Площадка 9'},
  {id: 10, value: 'Площадка 10'},
  {id: 11, value: 'Площадка 11'},
  {id: 12, value: 'Площадка 12'},
];

<SimpleSelect
    options={optionsList}
    css={{width: 300}}
    value={selected}
    onSelect={handleItemClick}
    selectInputStyles={css({borderRadius: 8})}
    optionsListStyles={css({borderRadius: 8, height: 300, overflow: 'auto'})}
    optionStyles={css({color: 'green'})}
/>
`.trim();
const exampleThemed = `
import {ThemeProvider} from 'emotion-theming';
import {createTheme, SimpleSelect} from 'neutrino-ui';

const theme = createTheme({
  colors: {
    pageElementsColors: {
      formElements: '#325b72',
      selectedItem: '#293676',
      border: '#0FC0FC',
    },
    textColors: {
      text: '#fff',
    },
  },
  typography: {
    span: {
      color: '#fff',
      fontSize: '14px',
    },
  },
});

const optionsList = [
  {id: -1, value: 'Все'},
  {id: 1, value: 'Площадка 1'},
  {id: 2, value: 'Площадка 2'},
  {id: 3, value: 'Площадка 3'},
  {id: 4, value: 'Площадка 4'},
  {id: 5, value: 'Площадка 5'},
  {id: 6, value: 'Площадка 6'},
  {id: 7, value: 'Площадка 7'},
  {id: 8, value: 'Площадка 8'},
  {id: 9, value: 'Площадка 9'},
  {id: 10, value: 'Площадка 10'},
  {id: 11, value: 'Площадка 11'},
  {id: 12, value: 'Площадка 12'},
];

<ThemeProvider theme={theme}>
  <SimpleSelect
    options={optionsList}
    css={{width: 300}}
    value={selected}
    onSelect={handleItemClick}
    selectInputStyles={css({borderRadius: 8})}
    optionsListStyles={css({borderRadius: 8, height: 300, overflow: 'auto'})}
  />
</ThemeProvider>
`.trim();

const exampleProps = `
type OptionItem = {
  id: string | number;
  value: string | number;
};

export interface ISimpleSelectProps extends Omit<React.HTMLProps<HTMLDivElement>, 'value' | 'onSelect'> {
  hasError?: boolean;
  value?: string | number;
  selectInputStyles?: SerializedStyles;
  optionsListStyles?: SerializedStyles;
  optionStyles?: SerializedStyles;
  options?: OptionItem[];
  onSelect: (event?: React.PointerEvent<HTMLLIElement>) => void;
}
`.trim();

const optionsList = [
  {id: -1, value: 'Все'},
  {id: 1, value: 'Площадка 1'},
  {id: 2, value: 'Площадка 2'},
  {id: 3, value: 'Площадка 3'},
  {id: 4, value: 'Площадка 4'},
  {id: 5, value: 'Площадка 5'},
  {id: 6, value: 'Площадка 6'},
  {id: 7, value: 'Площадка 7'},
  {id: 8, value: 'Площадка 8'},
  {id: 9, value: 'Площадка 9'},
  {id: 10, value: 'Площадка 10'},
  {id: 11, value: 'Площадка 11'},
  {id: 12, value: 'Площадка 12'},
];

export function SelectPage() {
  const [selected, setSelected] = React.useState(undefined);

  const handleItemClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const val = e.currentTarget.value;
    setSelected(Number(val));
  };

  return (
    <Wrapper>
      <Label>Simple Select</Label>
      <Example code={exampleProps} />
      <SimpleSelect
        options={optionsList}
        css={{width: 300}}
        value={selected}
        onSelect={handleItemClick}
        selectInputStyles={css({borderRadius: 8})}
        optionsListStyles={css({borderRadius: 8, height: 300, overflow: 'auto'})}
        optionStyles={css({color: 'green'})}
      />
      <Example code={exampleDefault} />
      <Label>Themed Simple Select</Label>
      <div
        css={{
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'flex-start',
          alignItems: 'center',
          width: 400,
          height: 300,
          paddingTop: 30,
          backgroundColor: '#000',
        }}
      >
        <ThemeProvider theme={theme}>
          <SimpleSelect
            options={optionsList}
            css={{width: 300}}
            value={selected}
            onSelect={handleItemClick}
            selectInputStyles={css({borderRadius: 8})}
            optionsListStyles={css({borderRadius: 8, height: 300, overflow: 'auto'})}
          />
        </ThemeProvider>
      </div>
      <Example code={exampleThemed} />
    </Wrapper>
  );
}
