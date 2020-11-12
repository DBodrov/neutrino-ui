import React from 'react';
import {css, SerializedStyles} from '@emotion/react';
import {useTheme} from '../Themes';
import {baseSliderStyle} from './styles';

type TSliderProps = React.HTMLProps<HTMLInputElement> & {
  onChangeHandler: (value: number, event?: React.ChangeEvent<HTMLInputElement>) => void;
  thumbCss?: SerializedStyles;
  trackCss?: SerializedStyles;
};

export function Slider(props: TSliderProps) {
  const {value, onChangeHandler, thumbCss, trackCss, ...restProps} = props;
  const {colors} = useTheme();
  const thumbStyle = css`
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      border: 3px #fff solid;
      border-radius: 50%;
      width: 25px;
      height: 25px;
      background-color: ${colors.mainColors.primary};
      cursor: pointer;
      margin-top: -10px;
    }
    &::-moz-range-thumb {
      border: 3px #fff solid;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      background-color: ${colors.mainColors.primary};
      cursor: pointer;
    }
    ${thumbCss}
  `;

  const trackStyle = css`
    &::-webkit-slider-runnable-track {
      background-color: ${colors.mainColors.primary};
      height: 4px;
      width: 100%;
      border-radius: 4px;
    };

    &::-moz-range-track {
      background-color: ${colors.pageElementsColors.border};
      height: 4px;
      width: 100%;
      border-radius: 4px;
    };

    &::-moz-range-progress {
      background-color: ${colors.mainColors.primary};
      height: 4px;
    };

    ${trackCss};
  `;

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.currentTarget.value);
      onChangeHandler(value, e);
    },
    [onChangeHandler],
  );

  return <input type="range" onChange={handleChange} css={[baseSliderStyle, thumbStyle, trackStyle]} {...restProps} />;
}
