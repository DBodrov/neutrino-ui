import React from 'react';
import styled from '@emotion/styled';
import {MaskInput} from '../../MaskInput';
import {useCombobox} from '../../Combobox';
import {useTheme} from '../../Themes';
import {useDayPicker} from '../DayPickerProvider';
import {CalendarIcon} from '../icons';

const CalendarButton = styled.button`
  background-color: transparent;
  border: 0;
  outline: 0;
  position: absolute;
  top: 25%;
  left: 85%;
  cursor: pointer;

`;

interface IPickerInputProps extends React.HTMLProps<HTMLInputElement> {}

export function PickerInput(props: IPickerInputProps) {
  const {className} = props;
  const {colors} = useTheme();
  const [maskedValue, setValue] = React.useState('');
  const {delimiter, format, mask, name, handleChangeDay} = useDayPicker();
  const {handleOpen, isOpen} = useCombobox();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const handleChange = (value: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(value);
    handleChangeDay(value);
  };

  return (
    <div css={{position: 'relative'}}>
      <MaskInput
        css={{height: '100%'}}
        mask={mask}
        name={name}
        type="decimal"
        onChangeHandler={handleChange}
        // onClick={handleOpen}
        value={maskedValue}
        maskPlaceholder="_"
        className={className}
      />
      <CalendarButton onClick={handleOpen}>
        <CalendarIcon stroke={isOpen ? colors.mainColors.primary : undefined} />
      </CalendarButton>
    </div>
  );
}
