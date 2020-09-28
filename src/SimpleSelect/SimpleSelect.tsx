import React from 'react';
import {css} from '@emotion/core';
import styled from '@emotion/styled';
import {useTheme} from '../Themes';
import {Combobox, ArrowIcon, useCombobox} from '../Combobox';
import {Dropdown} from '../Dropdown';
import {ISimpleSelectProps} from './types';

export function SimpleSelect(props: ISimpleSelectProps) {
  return (
    <Combobox>
      <Select {...props} />
    </Combobox>
  );
}

function Select(props: ISimpleSelectProps) {
  const {options, value, children, className, selectInputStyles} = props;
  //const [selectState, setState] = React.useState(value);
  const {handleClose, isOpen} = useCombobox();
  const simpleSelectRef = React.useRef<HTMLDivElement>(null);
  const optionsRef = React.useRef<HTMLDivElement>(null);

  const getDisplayValue = React.useCallback(() => {
    return options.find(item => {
      return item.id === value;
    }).value;
  }, [options, value]);

  return (
    <div css={{position: 'relative'}} className={className} ref={simpleSelectRef}>
      <SelectBox styles={selectInputStyles}>{getDisplayValue()}</SelectBox>
      <Dropdown isOpen={isOpen} ref={optionsRef} parentNode={isOpen ? simpleSelectRef : undefined}>
        {children({isOpen, handleClose})}
      </Dropdown>
    </div>
  );
}

const TextBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 4px;
`;

function SelectBox({children, styles}: any) {
  const {handleToggle, isOpen} = useCombobox();
  const {colors} = useTheme();
  const baseCss = css({
    border: `1px ${isOpen ? colors.pageElementsColors.activeBorder : colors.pageElementsColors.border} solid`,
    '&:hover': {cursor: 'pointer', borderColor: colors.pageElementsColors.activeBorder},
  });
  return (
    <TextBox onClick={handleToggle} css={[baseCss, styles]}>
      {children}
      <ArrowIcon />
    </TextBox>
  );
}
