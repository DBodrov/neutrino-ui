import React, {useState} from 'react';
import {css, jsx} from '@emotion/core';
import styled from '@emotion/styled';
import {Example, Wrapper} from './Example';
import {
  DayPicker,
  Select,
  SelectOptions,
  Span,
  Calendar,
  ISelectState,
  SelectChangeTypes,
  selectReducer,
  useSelect,
} from 'neutrino-ui';

const initState: ISelectState = {type: SelectChangeTypes.idle, isOpen: false};
const dayPickerReducer = (state: ISelectState = initState, changes: ISelectState): ISelectState => {
  const selectState = selectReducer(state, changes);
  console.info('== select ==', changes, state, selectState);
  switch (changes.type) {
    case SelectChangeTypes.close:
      return {
        ...selectState,
        isOpen: false,
      };
      default:
        return selectState;
  }
};

const DateBox = styled(Span)`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 14px;
`;

function DayPickerInput({date}: any) {
  const {handleToggleSelect} = useSelect()
  return (
    <DateBox onClick={handleToggleSelect}>{date}</DateBox>
  )
}

export function DatePickerPage() {
  const [date, setDate] = useState('');
  const dayPickerCfg = {format: 'YYYY/MM/DD'};

  return (
    <Wrapper>
      <span>DatePicker</span>

      <DayPicker value={date} onChangeHandler={(date: string) => setDate(date)} config={dayPickerCfg}>
          <DayPickerInput date={date}/>
      </DayPicker>
      <Span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda dolorem mollitia ut qui beatae
        corrupti. Excepturi amet optio nostrum dolore quia recusandae iure deserunt repellendus! Ipsum eveniet
        incidunt deserunt sunt.
      </Span>
      <Span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda dolorem mollitia ut qui beatae
        corrupti. Excepturi amet optio nostrum dolore quia recusandae iure deserunt repellendus! Ipsum eveniet
        incidunt deserunt sunt.
      </Span>
      <Span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda dolorem mollitia ut qui beatae
        corrupti. Excepturi amet optio nostrum dolore quia recusandae iure deserunt repellendus! Ipsum eveniet
        incidunt deserunt sunt.
      </Span>
      <Span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda dolorem mollitia ut qui beatae
        corrupti. Excepturi amet optio nostrum dolore quia recusandae iure deserunt repellendus! Ipsum eveniet
        incidunt deserunt sunt.
      </Span>
      <Span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda dolorem mollitia ut qui beatae
        corrupti. Excepturi amet optio nostrum dolore quia recusandae iure deserunt repellendus! Ipsum eveniet
        incidunt deserunt sunt.
      </Span>
      <Span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda dolorem mollitia ut qui beatae
        corrupti. Excepturi amet optio nostrum dolore quia recusandae iure deserunt repellendus! Ipsum eveniet
        incidunt deserunt sunt.
      </Span>
      <Span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda dolorem mollitia ut qui beatae
        corrupti. Excepturi amet optio nostrum dolore quia recusandae iure deserunt repellendus! Ipsum eveniet
        incidunt deserunt sunt.
      </Span>
      <Span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda dolorem mollitia ut qui beatae
        corrupti. Excepturi amet optio nostrum dolore quia recusandae iure deserunt repellendus! Ipsum eveniet
        incidunt deserunt sunt.
      </Span>
      <Span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda dolorem mollitia ut qui beatae
        corrupti. Excepturi amet optio nostrum dolore quia recusandae iure deserunt repellendus! Ipsum eveniet
        incidunt deserunt sunt.
      </Span>
      <Span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda dolorem mollitia ut qui beatae
        corrupti. Excepturi amet optio nostrum dolore quia recusandae iure deserunt repellendus! Ipsum eveniet
        incidunt deserunt sunt.
      </Span>
      <Span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda dolorem mollitia ut qui beatae
        corrupti. Excepturi amet optio nostrum dolore quia recusandae iure deserunt repellendus! Ipsum eveniet
        incidunt deserunt sunt.
      </Span>
    </Wrapper>
  );
}
