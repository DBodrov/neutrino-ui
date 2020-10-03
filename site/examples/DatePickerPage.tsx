import React, {useState} from 'react';
import styled from '@emotion/styled';
import {Example, Wrapper} from './Example';
import {DayPicker, Span} from 'neutrino-ui';

export function DatePickerPage() {
  const [date, setDate] = useState('');
  const dayPickerCfg = {format: 'YYYY/MM/DD', locale: 'ru'};

  return (
    <Wrapper>
      <span>DatePicker</span>

      <DayPicker
        name="someDate"
        value={date}
        onChangeHandler={(date: string) => setDate(date)}
        config={dayPickerCfg}
      />

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
