import React from 'react';
import {useSelect} from '../../Select';
import {StyledList, StyledOption} from './styles';
import {TOptionItem, SelectChangeTypes} from '../../types';

type TChildrenProps = {
  options: TOptionItem[];
};
type Props = {
  children?: (props: TChildrenProps) => React.ReactNode;
};
export function OptionsList(props: Props) {
  const {children} = props;
  const {isOpen, onSelect, dispatch, selectedValue, options} = useSelect();

  const optionRefs = React.useRef<HTMLLIElement[]>([]);

  const handleListClick = (e: React.PointerEvent<HTMLUListElement>) => {
    if (e.target instanceof HTMLLIElement) {
      onSelect(e.target.value);
      dispatch({type: SelectChangeTypes.selectItem});
    }
  };

  const handleListKeyDown = (e: React.KeyboardEvent<HTMLUListElement | HTMLLIElement>) => {
    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        if (e.target instanceof HTMLLIElement) {
          const nextFocusedIndex =
            options.findIndex(option => String(option.id) === String((e.target as HTMLLIElement).value)) + 1;
          if (nextFocusedIndex > options.length - 1) {
            optionRefs.current[0].focus();
          } else {
            optionRefs.current[nextFocusedIndex].focus();
          }
        }
        break;
      }

      case 'ArrowUp': {
        e.preventDefault();
        if (e.target instanceof HTMLLIElement) {
          const nextFocusedIndex =
            options.findIndex(option => String(option.id) === String((e.target as HTMLLIElement).value)) - 1;
          if (nextFocusedIndex < 0) {
            optionRefs.current[options.length - 1].focus();
          } else {
            optionRefs.current[nextFocusedIndex].focus();
          }
        }
        break;
      }

      case 'Escape': {
        e.preventDefault();
        dispatch({type: SelectChangeTypes.keyDownEsc});
        break;
      }

      case 'Enter': {
        e.preventDefault();
        dispatch({type: SelectChangeTypes.keyPressEnter});
        if (e.target instanceof HTMLLIElement) {
          onSelect(e.target.value);
        }
        break;
      }

      default:
        return;
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      if (selectedValue === null) {
        optionRefs.current[0].focus();
      } else {
        const selectedIndex = options.findIndex(option => String(option.id) === String(selectedValue));
        optionRefs.current[selectedIndex].focus();
      }
    }
  }, [isOpen, options, selectedValue]);

  return (
    <StyledList isOpen={isOpen} onClick={handleListClick} onKeyDown={handleListKeyDown} role="listbox">
      {children ? (
        children({options})
      ) : (
        <>
          {options.map((option, idx) => {
            return (
              <StyledOption
                data-id={option.id}
                ref={el => (optionRefs.current[idx] = el)}
                tabIndex={0}
                value={option.id}
                key={option.id}
                isSelected={String(option.id) === String(selectedValue)}
                role="option"
                aria-selected={String(option.id) === String(selectedValue)}
              >
                {option.value}
              </StyledOption>
            );
          })}
        </>
      )}
    </StyledList>
  );
}
