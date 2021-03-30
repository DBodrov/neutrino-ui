import React from 'react';
import {css} from '@emotion/react';
import styled from '@emotion/styled';
import {useTheme} from '../Themes';
import {ToggleArrowIcon, ToggleProvider, useToggle} from '../ToggleProvider';
import {Dropdown} from '../Dropdown';
import {ISimpleSelectProps} from './types';

export function SimpleSelect(props: ISimpleSelectProps) {
  return (
    <ToggleProvider>
      <Select {...props} />
    </ToggleProvider>
  );
}

function Select(props: ISimpleSelectProps) {
  const {options, value, className, selectInputStyles, onSelect, optionStyles, optionsListStyles} = props;

  const {handleClose, isOpen} = useToggle();
  const theme = useTheme();
  const simpleSelectRef = React.useRef<HTMLDivElement>(null);
  const [selectRect, setSelectRect] = React.useState(null);
  const optionsRef = React.useRef<HTMLDivElement>(null);

  const listBaseCss = css({
    margin: 0,
    padding: 0,
    listStyle: 'none',
    border: `1px ${theme.colors.pageElementsColors.border} solid`,
    boxSizing: 'border-box',
    backgroundColor: theme.colors.pageElementsColors.formElements,
    width: '100%',
  });

  const optionBaseCss = css({
    padding: '8px 16px',
    borderBottom: '1px #ccc solid',
    margin: 0,
    color: theme.colors.textColors.text,
    fontSize: 14,
    cursor: 'pointer',
  });

  const getDisplayValue = React.useCallback(() => {
    if (!value) {
      return '';
    }
    return options?.find(item => {
      return item.id === value;
    }).value;
  }, [options, value]);

  const handleItemClick = React.useCallback(
    (event: React.PointerEvent<HTMLLIElement>) => {
      onSelect(event);
      handleClose();
    },
    [handleClose, onSelect],
  );

  React.useEffect(() => {
    const handleClickOutside = (e: PointerEvent) => {
      if (e.target instanceof HTMLElement && isOpen) {
        const optionsList = optionsRef?.current;
        const selectInput = simpleSelectRef?.current;
        if (optionsList?.contains(e.target) || selectInput?.contains(e.target)) {
          return;
        }
        handleClose();
      }
    };

    const handleScroll = (e: PointerEvent) =>
      window.requestAnimationFrame(() => {
        if (e.target instanceof HTMLElement && isOpen) {
          const optionsList = optionsRef?.current;
          if (optionsList?.contains(e.target)) {
            return;
          }
          setSelectRect(simpleSelectRef?.current.getBoundingClientRect());
        }
      });

    if (isOpen) {
      setSelectRect(simpleSelectRef?.current.getBoundingClientRect());
      document.addEventListener('click', handleClickOutside);
      window.addEventListener('scroll', handleScroll, true);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [handleClose, isOpen]);

  return (
    <div css={{position: 'relative'}} className={className} ref={simpleSelectRef}>
      <SelectBox styles={selectInputStyles}>{getDisplayValue()}</SelectBox>
      <Dropdown isOpen={isOpen} ref={optionsRef} parentBound={isOpen ? selectRect : undefined}>
        <ul css={[listBaseCss, optionsListStyles]}>
          {options?.map(option => {
            return (
              <li
                role="option"
                aria-selected={option.id === value ? 'true' : 'false'}
                key={option.id}
                value={option.id}
                css={[
                  optionBaseCss,
                  css({
                    backgroundColor:
                      option.id === value ? theme.colors.pageElementsColors.selectedItem : 'transparent',
                  }),
                  optionStyles,
                ]}
                onClick={handleItemClick}
              >
                {option.value}
              </li>
            );
          })}
        </ul>
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
  padding: 12px 16px;
`;

function SelectBox({children, styles}: any) {
  const {handleToggle, isOpen} = useToggle();
  const {colors} = useTheme();
  const baseCss = css({
    border: `1px ${isOpen ? colors.pageElementsColors.activeBorder : colors.pageElementsColors.border} solid`,
    '&:hover': {cursor: 'pointer', borderColor: colors.pageElementsColors.activeBorder},
    color: colors.textColors.text,
    backgroundColor: colors.pageElementsColors.formElements,
  });
  return (
    <TextBox onClick={handleToggle} css={[baseCss, styles]}>
      {children}
      <ToggleArrowIcon />
    </TextBox>
  );
}
