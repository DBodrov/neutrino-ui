import React from 'react';
import {ToggleProvider, useToggle} from '../../ToggleProvider';
import {Dropdown} from '../../Dropdown';
import {DateRangeProvider, useDateRange} from './DateRangeProvider';
import {DateRangeInput} from './DateRangeInput';
import {RangeCalendar} from './RangeCalendar';
import {TDateRangeProps} from './types';

function DateRangeComponent(props: TDateRangeProps) {
  const {inputCss, value, calendarCss} = props;
  const {isOpen, handleToggle, handleClose} = useToggle();
  const {handleChangeCalendarView} = useDateRange();
  const rangeInputRef = React.useRef<HTMLDivElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const rangeInputRect = rangeInputRef?.current?.getBoundingClientRect();
  const getBound = React.useCallback(() => {
    const rect = rangeInputRect?.toJSON();
    if (!rect) return {};
    const bound = {...rect, width: 490, left: rect.left - (490 - rangeInputRect?.width) / 2};
    return bound;
  }, [rangeInputRect]);

  const handleInputClick = React.useCallback(() => {
    handleToggle();
    handleChangeCalendarView('days', 'start');
    handleChangeCalendarView('days', 'end');
  }, [handleChangeCalendarView, handleToggle]);

  React.useEffect(() => {
    const handleClickOutside = (e: PointerEvent | MouseEvent) => {
      if (e.target instanceof HTMLElement && isOpen) {
        const calendar = dropdownRef?.current;
        const rangeInput = rangeInputRef?.current;
        if (calendar?.contains(e.target) || rangeInput?.contains(e.target)) {
          return;
        }
        handleClose();

        handleChangeCalendarView('days', 'start');
        handleChangeCalendarView('days', 'end');
      }
    };

    const handleScroll = (e?: Event) => {
      handleClose();
      handleChangeCalendarView('days', 'start');
      handleChangeCalendarView('days', 'end');
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      window.addEventListener('scroll', handleScroll, true);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [handleChangeCalendarView, handleClose, isOpen]);

  return (
    <div css={{position: 'relative', width: '100%'}}>
      <DateRangeInput value={value} inputCss={inputCss} ref={rangeInputRef} onClick={handleInputClick} />
      <Dropdown isOpen={isOpen} parentBound={isOpen ? getBound() : undefined} ref={dropdownRef}>
        <RangeCalendar calendarCss={calendarCss}/>
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
