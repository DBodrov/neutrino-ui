import React from 'react';
import {useToggle} from './utils';
import {OptionsList} from './components';
import {ToggleArrowIcon} from './ToggleArrowIcon';
import {ISimpleSelectProps} from './types';
import {StyledInput, StyledList, StyledOption} from './styles';

export function Select(props: ISimpleSelectProps) {
  const {value, options} = props;
  const {handleClose, handleToggle, isOpen, handleOpen} = useToggle();
  const [selectedValue, setSelectedValue] = React.useState<string | number | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);
  const optionItemsRef = React.useRef<HTMLLIElement[]>([]);

  const getDisplayValue = () => {
    if (!value) {
      return '';
    }
    return options?.find(item => {
      return item.id === value;
    }).value;
  };

  return (
    <div css={{position: 'relative', '--a3-color-border': '#C5C5C5'}}>
      <StyledInput
        ref={inputRef}
        readOnly
        value={getDisplayValue()}
        onClick={handleToggle}
        css={{borderColor: isOpen ? 'blue' : '--a3-color-border'}}
      />
      <ToggleArrowIcon isOpen={isOpen} css={{position: 'absolute', right: '0.5rem', top: '1rem'}}/>
      <OptionsList isOpen={isOpen} options={options} onSelect={setSelectedValue} selectedValue={selectedValue}/>

    </div>
  );
}
