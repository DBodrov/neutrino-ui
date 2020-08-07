import React, { useState } from 'react';
import { css } from '@emotion/core';

import { Switch } from 'neutrino-ui';

import { Example, Wrapper } from './Example';

const onBackground = 'green';
const offBackground = '#cacaca';

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
      <Example code={exampleDefault} />
      <Switch
        on={on}
        onToggle={() => setOn((on) => !on)}
        trackCss={trackCss}
        buttonCss={buttonCss}
        disabled={false}
      />
    </Wrapper>
  );
}

const exampleDefault = `
import React, { useState } from 'react';
import { css } from '@emotion/core';
import { Switch } from 'neutrino-ui';

const onBackground = '#008000';
const offBackground = '#cacaca';

const buttonCss = css({
  width: '16px',
  height: '16px'
  backgroundColor: '#fff';

})
';

export function SwitchPage() {
  const [on, setOn] = useState(false);
  const trackCss = css({
    width: '48px'
    height: '24px'
    background: on ? onBackground : offBackground,
    padding: '4px'
  });

  return (
    <>
      <Switch
        on={on}
        onToggle={() => setOn((on) => !on)}
        trackCss={trackCss}
        buttonCss={buttonCss}
        disabled
      />
    </>
  );
}
`.trim();
