import React from 'react';
import {useTheme} from '../../../Themes';
import {CalendarIcon} from './CalendarIcon';
import {DateRangeInputBox, DateRangeInputSection} from './styles';
import {IDateRangeInputProps} from '../types';



function DateRangeInputComponent(props: IDateRangeInputProps, ref: React.ForwardRefExoticComponent<HTMLDivElement>) {
  const {inputCss, onClick} = props;
  const inputRef = React.useRef<HTMLDivElement>(null);
  React.useImperativeHandle(ref, () => inputRef.current, []);
  return (
    <DateRangeInputBox ref={inputRef} css={[inputCss]} onClick={onClick}>
      <DateRangeInputSection>
        <CalendarIcon />
      </DateRangeInputSection>
      <DateRangeInputSection>
        <CalendarIcon />
      </DateRangeInputSection>
    </DateRangeInputBox>
  );
}

export const DateRangeInput = React.forwardRef(DateRangeInputComponent);
