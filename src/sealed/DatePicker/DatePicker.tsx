import React from 'react';
import {ToggleProvider, useToggle} from '../../ToggleProvider';
import {Dropdown} from '../../Dropdown';
import {Calendar} from './Calendar';
import {DatePickerProvider, useDatePicker} from './DatePickerProvider';
import {DateInput} from './DateInput';
import {CalendarIcon} from './icons';
import {CalendarButton} from './styles';
import {IDatePickerProps} from './types';

//TODO: click outside
function DatePickerComponent() {
  const {inputStyles, width, handleChangeCalendarView, onBlur} = useDatePicker();
  const {isOpen, handleToggle, handleClose} = useToggle();
  const dateInputRef = React.useRef<HTMLInputElement>(null);
  const inputRect = dateInputRef?.current?.getBoundingClientRect();
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const calendarButtonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: PointerEvent | MouseEvent) => {
      if (e.target instanceof HTMLElement && isOpen) {
        const calendar = dropdownRef?.current;
        const pickerInput = dateInputRef?.current;
        const calendarButton = calendarButtonRef?.current;
        if (
          calendar?.contains(e.target) ||
          pickerInput?.contains(e.target) ||
          calendarButton?.contains(e.target)
        ) {
          return;
        }
        handleClose();
        handleChangeCalendarView('days');
      }
    };

    const handleScroll = (e?: Event) => {
      handleClose();
      handleChangeCalendarView('days');
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      window.addEventListener('scroll', handleScroll, true);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [handleChangeCalendarView, handleClose, isOpen, onBlur]);

  return (
    <div css={{position: 'relative', width}}>
      <DateInput inputCss={{inputStyles}} ref={dateInputRef} />
      <CalendarButton
        type="button"
        onClick={handleToggle}
        ref={calendarButtonRef}
        css={{position: 'absolute', top: '50%', right: 8, transform: 'translateY(-50%)'}}
      >
        <CalendarIcon />
      </CalendarButton>
      <Dropdown isOpen={isOpen} ref={dropdownRef} parentBound={isOpen ? inputRect : undefined}>
        <Calendar css={{borderRadius: 4}} />
      </Dropdown>
    </div>
  );
}

export function DatePicker(props: IDatePickerProps) {
  return (
    <ToggleProvider>
      <DatePickerProvider {...props}>
        <DatePickerComponent />
      </DatePickerProvider>
    </ToggleProvider>
  );
}
