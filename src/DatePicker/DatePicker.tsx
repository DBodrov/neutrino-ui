import React, { useCallback, useRef, useState } from 'react';
import { Dropdown, useDropdown } from '../Dropdown';
import { Modal } from '../Modal';
import { PickerInput } from './PickerInput';
import { Calendar } from './Calendar';
import { DatePickerProvider } from './DatePicker.provider';
import { IDatePickerProps } from './types';
import css from './DatePicker.module.scss';

const modalStyles: React.CSSProperties = {
    width: '80%',
    height: '80%',
    maxHeight: '400px',
    userSelect: 'none',
};

const dropdownStyles: React.CSSProperties = {
    paddingBottom: 0,
    height: '80%',
    maxHeight: '400px',
    userSelect: 'none',
};

export function DatePicker(props: IDatePickerProps) {
    const { disabled, styles, hasError } = props;
    const [isOpen, setIsOpen] = useState(false);
    const dpRef = useRef<HTMLDivElement>(null);
    // const { isOpen, parentRect, setIsOpen } = useDropdown(dpRef);
    const handleClick = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen, setIsOpen]);

    const handleCloseModal = useCallback(() => {
        setIsOpen(false);
    }, [setIsOpen]);

    const handleCloseCalendar = useCallback(() => {
        setIsOpen(false);
    }, [setIsOpen]);

    return (
        <DatePickerProvider {...props} onCloseCalendar={handleCloseCalendar} calendarIsOpen={isOpen}>
            <PickerInput onClick={handleClick} />
            <Dropdown isOpen={isOpen}>
                {/* <Calendar /> */}
            </Dropdown>
        </DatePickerProvider>
    );
}

export default DatePicker;
