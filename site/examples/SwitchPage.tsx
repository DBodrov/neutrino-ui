import React, { useState } from 'react';
import { ThemeProvider } from 'emotion-theming';
import { Switch, createTheme } from 'neutrino-ui';
import { Example, Wrapper } from './Example';

export function SwitchPage() {

  const [on, setOn] = useState(false);

  return (
    <Wrapper>
      <Switch on={on} onToggle={() => setOn(on => !on)}/>
    </Wrapper>
  )
}
