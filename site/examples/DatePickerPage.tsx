import React, {useState} from 'react';
import styled from '@emotion/styled';
import {css} from '@emotion/core';
import {Example, Wrapper} from './Example';
import {DayPicker, Span} from 'neutrino-ui';

export function DatePickerPage() {
  const [date, setDate] = useState('');
  const dayPickerCfg = {format: 'DD/MM/YYYY', locale: 'ru'};

  return (
    <Wrapper>
      <span>DatePicker</span>

      <DayPicker
        name="someDate"
        value={date}
        onChangeHandler={(date: string) => setDate(date)}
        config={dayPickerCfg}
        pickerInputStyles={css({borderRadius: 8})}
        isEditable
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
