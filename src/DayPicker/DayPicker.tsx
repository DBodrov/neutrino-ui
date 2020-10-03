import React from 'react';
import {css} from '@emotion/core';
import {Combobox, useCombobox} from '../Combobox';
import {useTheme} from '../Themes';
import {Dropdown} from '../Dropdown';
import {DayPickerProvider} from './DayPickerProvider';
import {Calendar} from './Calendar';
import {TDatePickerProps} from './types';
import {TextBox} from './styles';

export function DayPicker(props: TDatePickerProps) {
  return (
    <Combobox>
      <DatePicker {...props} />
    </Combobox>
  );
}

function PickerInput({children}: {children: React.ReactNode}) {
  const {handleToggle, isOpen} = useCombobox();
  const {colors} = useTheme();
  const baseCss = css({
    border: `1px ${isOpen ? colors.pageElementsColors.activeBorder : colors.pageElementsColors.border} solid`,
    '&:hover': {cursor: 'pointer', borderColor: colors.pageElementsColors.activeBorder},
    color: colors.textColors.text,
    backgroundColor: colors.pageElementsColors.formElements,
  });
  return (
    <TextBox onClick={handleToggle} css={[baseCss]}>
      {children}
    </TextBox>
  );
}

function DatePicker(props: TDatePickerProps) {
  const {value} = props;
  const [pickerRect, setRect] = React.useState(null);
  const {isOpen, handleClose} = useCombobox();
  const datePickerRef = React.useRef<HTMLDivElement>(null);
  const calendarRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: PointerEvent) => {
      if (e.target instanceof HTMLElement && isOpen) {
        const calendar = calendarRef?.current;
        const pickerInput = datePickerRef?.current;
        if (calendar?.contains(e.target) || pickerInput?.contains(e.target)) {
          return;
        }
        handleClose();
      }
    };

    const handleScroll = (e: PointerEvent) =>
      window.requestAnimationFrame(() => {
        if (e.target instanceof HTMLElement && isOpen) {
          const calendar = calendarRef?.current;
          if (calendar?.contains(e.target)) {
            return;
          }
          setRect(datePickerRef?.current.getBoundingClientRect());
        }
      });

    if (isOpen) {
      setRect(datePickerRef?.current.getBoundingClientRect());
      document.addEventListener('click', handleClickOutside);
      window.addEventListener('scroll', handleScroll, true);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [handleClose, isOpen]);

  return (
    <div css={{position: 'relative', width: 300}} ref={datePickerRef}>
      <DayPickerProvider {...props}>
        <PickerInput>{value}</PickerInput>
        <Dropdown isOpen={isOpen} ref={calendarRef} parentBound={isOpen ? pickerRect : undefined}>
          <Calendar />
        </Dropdown>
      </DayPickerProvider>
    </div>
  );
}
