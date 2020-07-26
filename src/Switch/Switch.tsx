import React from 'react';
import styled from '@emotion/styled';
import { css, SerializedStyles } from '@emotion/core';
import { useTheme } from '../Themes';

export interface ISwitchProps {
  on: boolean;
  disabled?: boolean;
  trackCss?: SerializedStyles;
  buttonCss?: SerializedStyles;
  onToggle: () => void;
}

const SwitchTrack = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 2rem;
  height: 1.2rem;
  border-radius: 80px;
  align-items: center;
  transition: all 0.3s ease-in-out;
`;

const SwitchButton = styled.div`
  display: flex;
  width: 50%;
  height: 80%;
  border-radius: 50%;
  transition: all 0.6s ease-in;
`;

export function Switch({ on, disabled, onToggle, buttonCss, trackCss }: ISwitchProps) {
  const theme = useTheme();
  const { colors, globals } = theme;
  const trackStyles = css`
    border: 1px
      ${on
        ? colors.mainColors.primary
        : disabled
        ? colors.pageElementsColors.disabled
        : colors.pageElementsColors.border}
      solid;
    background-color: ${on ? colors.mainColors.primary : colors.pageElementsColors.formElements};
    cursor: ${disabled ? 'not-allowed' : 'pointer'};
  `;

  const buttonStyles = css`
    border: 1px ${on ? '#fff' : colors.pageElementsColors.disabled} solid;
    background-color: ${on ? '#fff' : colors.pageElementsColors.disabled};
    margin-left: ${on ? 'auto' : 0};
  `;
  return (
    <SwitchTrack css={[trackStyles, trackCss]} onClick={onToggle}>
      <SwitchButton css={[buttonStyles, buttonCss]}></SwitchButton>
    </SwitchTrack>
  );
}
