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
  const getBound = React.useCallback(() => {
    const rect = rangeInputRect.toJSON();
    console.log(rect);
    const bound = {...rect, width: 490, left: rect.left - (490 - rangeInputRect?.width)/2};
    console.log('bound', bound);
    return bound;
  }, [rangeInputRect]);
  return (
    <div css={{position: 'relative', width: '100%'}}>
      <DateRangeInput inputCss={inputCss} ref={rangeInputRef} onClick={handleToggle} />
      <Dropdown isOpen={isOpen} parentBound={isOpen ? getBound() : undefined} ref={dropdownRef}>
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
