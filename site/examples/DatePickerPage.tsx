import React, {useState} from 'react';
import {css, jsx} from '@emotion/core';
import {Example, Wrapper} from './Example';
import {DayPicker, Select, SelectOptions, Span, Calendar} from 'neutrino-ui';

export function DatePickerPage() {
  const [date, setDate] = useState('20.07.2020');
  const dayPickerCfg = {format: 'DD/MM/YYYY'};
  return (
    <Wrapper>
      <span>DatePicker</span>
      {/* <DayPicker
        css={{borderColor: '#080'}}
        onChange={(d: string) => setDate(d)}
        value={date}
        name="date"
        config={dayPickerCfg}
        inputCss={css`
          width: 300px;
          height: 32px;
          letter-spacing: 0.2rem;
        `}
      /> */}
      <DayPicker value={date}>
        <Select
          width="250px"
          height="48px"
          css={{border: '1px #dde1e5 solid', padding: '0 8px', cursor: 'pointer'}}
        >
          <Span css={{fontSize: 14}}>{date}</Span>
          <SelectOptions>
            <Calendar />
          </SelectOptions>
        </Select>
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
