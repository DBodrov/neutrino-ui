import React from 'react';
import {useSelect} from '../../Select';
import {SelectChangeTypes} from '../../types';
import {ISelectInputProps} from './types';
import {ToggleArrowIcon} from '../ToggleArrowIcon';
import {StyledInput} from './styles';

export function SelectInput(props: ISelectInputProps) {
  const {styles, ...restProps} = props;
  const {isOpen, displayValue, dispatch} = useSelect();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Space') {
      e.preventDefault();
      dispatch({type: SelectChangeTypes.keyDownSpace});
    }
  }

  return (
    <>
      <StyledInput
        readOnly
        value={displayValue}
        onClick={() => dispatch({type: SelectChangeTypes.idle, isOpen: !isOpen})}
        onKeyDown={handleKeyDown}
        css={[{borderColor: isOpen ? 'var(--a3-color-active-border)' : 'var(--a3-color-border)'}, styles]}
        {...restProps}
      />
      <ToggleArrowIcon isOpen={isOpen} css={{position: 'absolute', right: '0.5rem', top: '1rem'}} />
    </>
  );
}
