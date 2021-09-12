import React from 'react';
import {css} from '@emotion/react';
import {ThemeProvider} from '@emotion/react';
import {Wrapper, Example, Label} from './Example';
import {createTheme, SimpleSelect} from 'neutrino-ui';
import {Select, SelectInput, OptionsList} from 'neutrino-ui/lib/sealed';
import {MultiSelect, example} from './MultiSelect';

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
  {id: -1, value: 'All items'},
  {id: 1, value: 'Item 1'},
  {id: 2, value: 'Item 2'},
  {id: 3, value: 'Item 3'},
  {id: 4, value: 'Item 4'},
  {id: 5, value: 'Item 5'},
  {id: 6, value: 'Item 6'},
  {id: 7, value: 'Item 7'},
  {id: 8, value: 'Item 8'},
  {id: 9, value: 'Item 9'},
  {id: 10, value: 'Item 10'},
  {id: 11, value: 'Item 11'},
  {id: 12, value: 'Item 12'},
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
  {id: -1, value: 'All items'},
  {id: 1, value: 'Item 1'},
  {id: 2, value: 'Item 2'},
  {id: 3, value: 'Item 3'},
  {id: 4, value: 'Item 4'},
  {id: 5, value: 'Item 5'},
  {id: 6, value: 'Item 6'},
  {id: 7, value: 'Item 7'},
  {id: 8, value: 'Item 8'},
  {id: 9, value: 'Item 9'},
  {id: 10, value: 'Item 10'},
  {id: 11, value: 'Item 11'},
  {id: 12, value: 'Item 12'},
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
  {id: -1, value: 'All items'},
  {id: 1, value: 'Item 1'},
  {id: 2, value: 'Item 2'},
  {id: 3, value: 'Item 3'},
  {id: 4, value: 'Item 4'},
  {id: 5, value: 'Item 5'},
  {id: 6, value: 'Item 6'},
  {id: 7, value: 'Item 7'},
  {id: 8, value: 'Item 8'},
  {id: 9, value: 'Item 9'},
  {id: 10, value: 'Item 10'},
  {id: 11, value: 'Item 11'},
  {id: 12, value: 'Item 12'},
];

export function SelectPage() {
  const [selected, setSelected] = React.useState(undefined);
  const [itemId, setItemId] = React.useState(null);
  const [items, setItems] = React.useState<number[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleItemClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const val = e.currentTarget.value;
    setSelected(Number(val));
  };

  const handleSelectItemId = (value: string | number) => setItemId(value);

  const handleMultiSelect = (value: number[]) => setItems(value);

  return (
    <Wrapper>
      <Label>Simple Select</Label>
      <Example code={exampleProps} />
      <div css={{width: 300}}>
        <Select
          options={optionsList}
          styles={css({width: 300, '--a3-color-border': '#C5C5C5', '--a3-color-active-border': 'green'})}
          value={itemId}
          onSelect={handleSelectItemId}
        >
          <SelectInput />
          <OptionsList />
        </Select>
      </div>
      <div css={{height: 20}}></div>
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
      <Label>MultiSelect</Label>
      <MultiSelect options={optionsList} value={items} onSelect={handleMultiSelect} />
      <Example code={example} />
    </Wrapper>
  );
}
