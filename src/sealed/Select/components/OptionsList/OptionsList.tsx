import React from 'react';
import {StyledList, StyledOption} from './styles';
import {TOptionItem} from '../../types';

type Props = {
  options?: TOptionItem[];
  isOpen: boolean;
  selectedValue?: string | number;
  onSelect: (value: string | number) => void;
};
export function OptionsList(props: Props) {
  const {options, isOpen, onSelect, selectedValue} = props;

  const optionRefs = React.useRef<HTMLLIElement[]>([]);

  const handleListClick = (e: React.PointerEvent<HTMLUListElement>) => {
    if (e.target instanceof HTMLLIElement) {
      onSelect(e.target.value);
    }
  };

  const handleListKeyDown = (e: React.KeyboardEvent<HTMLUListElement | HTMLLIElement>) => {
    // console.log(e.target, e.key);
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

      default:
        return;
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      if (selectedValue === null) {
        // console.log(optionRefs.current[0]);
        optionRefs.current[0].focus();
      } else {
        const selectedIndex = options.findIndex(option => String(option.id) === String(selectedValue));
        optionRefs.current[selectedIndex].focus();
      }
    }
  }, [isOpen, options, selectedValue]);

  return (
    <StyledList isOpen={isOpen} onClick={handleListClick} onKeyDown={handleListKeyDown}>
      {options.map((option, idx) => {
        return (
          <StyledOption
            data-id={option.id}
            ref={el => (optionRefs.current[idx] = el)}
            tabIndex={0}
            value={option.id}
            key={option.id}
            isSelected={String(option.id) === String(selectedValue)}
          >
            {option.value}
          </StyledOption>
        );
      })}
    </StyledList>
  );
}
