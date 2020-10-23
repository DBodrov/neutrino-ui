import React from 'react';
import styled from '@emotion/styled';
import {Calendar, Dropdown, useCombobox, CalendarIcon, useTheme, useDayPicker} from 'neutrino-ui';
import {DateInput} from '../DateInput';

const CalendarButton = styled.button`
  background-color: transparent;
  border: 0;
  outline: 0;
  position: absolute;
  top: 25%;
  left: 85%;
  cursor: pointer;
`;

export function DatePickerComponent() {
  const {isOpen, handleOpen, handleClose} = useCombobox();
  const {handleChangeDay, value} = useDayPicker();
  const {colors} = useTheme();
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const dateInputRef = React.useRef<HTMLInputElement>(null);
  const inputRect = dateInputRef?.current?.getBoundingClientRect();

  React.useEffect(() => {
    const handleClickOutside = (e: PointerEvent) => {
      if (e.target instanceof HTMLElement && isOpen) {
        const calendar = dropdownRef?.current;
        const pickerInput = dropdownRef?.current;
        if (calendar?.contains(e.target) || pickerInput?.contains(e.target)) {
          return;
        }
        handleClose();
      }
    };

    const handleScroll = (e: PointerEvent) => handleClose();

    if (isOpen) {
      // setRect(datePickerRef?.current.getBoundingClientRect());
      document.addEventListener('click', handleClickOutside);
      window.addEventListener('scroll', handleScroll, true);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [handleClose, isOpen]);

  return (
    <div css={{position: 'relative', width: 250}}>
      <DateInput ref={dateInputRef} value={value}/>
      <CalendarButton onClick={handleOpen}>
        <CalendarIcon stroke={isOpen ? colors.mainColors.primary : undefined} />
      </CalendarButton>
      <Dropdown isOpen={isOpen} ref={dropdownRef} parentBound={isOpen ? inputRect : undefined}>
        <Calendar />
      </Dropdown>
    </div>
  );
}
