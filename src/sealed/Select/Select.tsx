import React from 'react';
import {SerializedStyles} from '@emotion/react';
import {useToggle} from './utils';
import {OptionsList} from './components';
import {ToggleArrowIcon} from './ToggleArrowIcon';
import {TSelectProps, SelectChangeTypes, TSelectState, TOptionItem} from './types';
import {StyledInput} from './styles';

const selectStateReducer = (state: TSelectState, changes: TSelectState): TSelectState => {
  switch (changes.type) {
    case SelectChangeTypes.idle:
    default:
      return changes;
    case SelectChangeTypes.clickOutside:
    case SelectChangeTypes.keyDownEsc:
    case SelectChangeTypes.keyPressEnter:
    case SelectChangeTypes.selectItem:
      return {
        ...state,
        isOpen: false,
      };
  }
};

export type TSelectContext = {
  isOpen: boolean;
  displayValue?: string | number;
  selectedValue?: string | number;
  dispatch: React.Dispatch<TSelectState>;
  options?: TOptionItem[];
  onSelect?: (value: string | number) => void;
};
const SelectContext = React.createContext<TSelectContext>(null);
SelectContext.displayName = 'SelectContext';

export function Select(props: TSelectProps) {
  const {value, options, stateReducer = selectStateReducer, children, styles, onSelect} = props;
  const [{isOpen}, dispatch] = React.useReducer(stateReducer, {isOpen: false, type: SelectChangeTypes.idle});
  const selectRef = React.useRef<HTMLDivElement>(null);

  const getDisplayValue = React.useCallback(() => {
    if (!value) {
      return '';
    }
    return options?.find(item => {
      return item.id === value;
    }).value;
  }, [options, value]);

  React.useEffect(() => {
    const handleClickOutside = (e: PointerEvent) => {
      if (e.target instanceof HTMLElement && isOpen) {
        if (selectRef.current.contains(e.target)) {
          return;
        }
        dispatch({type: SelectChangeTypes.clickOutside});
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  const ctx = React.useMemo<TSelectContext>(
    () => ({isOpen, displayValue: getDisplayValue(), dispatch, onSelect, selectedValue: value, options}),
    [getDisplayValue, isOpen, onSelect, options, value],
  );

  return (
    <SelectContext.Provider value={ctx}>
      <div css={[{position: 'relative'}, styles]} ref={selectRef}>
        {children}
      </div>
    </SelectContext.Provider>
  );
}

export function useSelect() {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error('useSelect must be used within a Select');
  }
  return context;
}
// <div css={{position: 'relative', '--a3-color-border': '#C5C5C5'}} ref={selectRef}>
//   <StyledInput
//     ref={inputRef}
//     readOnly
//     value={getDisplayValue()}
//     onClick={() => dispatch({type: SelectChangeTypes.idle, })}
//     css={{borderColor: isOpen ? 'blue' : '--a3-color-border'}}
//   />
//   <ToggleArrowIcon isOpen={isOpen} css={{position: 'absolute', right: '0.5rem', top: '1rem'}} />
//   <OptionsList
//     isOpen={isOpen}
//     options={options}
//     onSelect={setSelectedValue}
//     selectedValue={selectedValue}
//   />
// </div>

type TSelectInputProps = {
  styles?: SerializedStyles;
};

export function SelectInput(props: TSelectInputProps) {
  const {styles} = props;
  const {isOpen, displayValue, dispatch} = useSelect();
  return (
    <>
      <StyledInput
        readOnly
        value={displayValue}
        onClick={() => dispatch({type: SelectChangeTypes.idle, isOpen: !isOpen})}
        css={[{borderColor: isOpen ? 'var(--a3-color-active-border)' : 'var(--a3-color-border)'}, styles]}
      />
      <ToggleArrowIcon isOpen={isOpen} css={{position: 'absolute', right: '0.5rem', top: '1rem'}} />
    </>
  );
}
