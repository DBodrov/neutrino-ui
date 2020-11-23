import React from 'react';
import {ToggleProvider, useToggle} from '../../ToggleProvider';
import {Dropdown} from '../../Dropdown';
import {DateRangeProvider} from './DateRangeProvider';
import {DateRangeInput} from './DateRangeInput';
import {RangeCalendar} from './RangeCalendar';
import {TDateRangeProps} from './types';

function DateRangeComponent(props: TDateRangeProps) {
  const {inputCss} = props;
  const {isOpen, handleToggle} = useToggle();
  const rangeInputRef = React.useRef<HTMLDivElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const rangeInputRect = rangeInputRef?.current?.getBoundingClientRect();
  return (
    <div css={{position: 'relative', width: '100%'}}>
      <DateRangeInput inputCss={inputCss} ref={rangeInputRef} onClick={handleToggle} />
      <Dropdown isOpen={isOpen} parentBound={isOpen ? rangeInputRect : undefined} ref={dropdownRef}>
        <RangeCalendar />
      </Dropdown>
    </div>
  );
}

export function DateRangePicker(props: TDateRangeProps) {
  return (
    <ToggleProvider>
      <DateRangeProvider {...props}>
        <DateRangeComponent {...props} />
      </DateRangeProvider>
    </ToggleProvider>
  );
}
