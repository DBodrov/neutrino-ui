import React, { useState } from 'react';
import { css } from '@emotion/core';

import { Switch, createTheme, ISwitchProps } from 'neutrino-ui';

import { Example, Wrapper } from './Example';

const onBackground = 'linear-gradient(0deg, rgba(25, 145, 235, 0.4) 2.22%, rgba(45, 161, 248, 0.4) 98.44%);'
const offBackground = '#222C3C';


const buttonCss = css`
  width: 16px;
  height: 16px;
  background-color: #fff;
`;

export function SwitchPage() {

  const [on, setOn] = useState(false);
  const trackCss = css`
    width: 48px;
    height: 24px;
    background: ${on ? onBackground : offBackground};
    padding: 4px;
  `;

  return (
    <Wrapper>
      <Switch on={on} onToggle={() => setOn(on => !on)} trackCss={trackCss} buttonCss={buttonCss}/>
    </Wrapper>
  )
}
