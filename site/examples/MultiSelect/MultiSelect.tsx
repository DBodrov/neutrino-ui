import React from 'react';
import {css} from '@emotion/core';
import styled from '@emotion/styled';
import {ArrowIcon, Combobox, useCombobox, useTheme, Span, Dropdown} from 'neutrino-ui';

type OptionItem = {
  id: string | number;
  value: string | number;
};

type Props = {
  options?: OptionItem[];
  value?: number[];
  onSelect: (values: number[]) => void;
};

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
  const {handleToggle, isOpen} = useCombobox();
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
      <ArrowIcon />
    </TextBox>
  );
}

function Select({options, value, onSelect}: Props) {
  const [selectedChecks, setCheck] = React.useState<number[]>(value);
  const [selectRect, setSelectRect] = React.useState(null);
  const theme = useTheme();
  const mSelectRef = React.useRef<HTMLDivElement>(null);
  const optionsRef = React.useRef<HTMLDivElement>(null);
  const {isOpen, handleClose} = useCombobox();

  const listBaseCss = css({
    margin: 0,
    padding: 0,
    listStyle: 'none',
    border: `1px ${theme.colors.pageElementsColors.border} solid`,
    boxSizing: 'border-box',
    backgroundColor: theme.colors.pageElementsColors.formElements,
    width: '100%',
    height: 200,
    overflow: 'auto',
  });

  const optionBaseCss = css({
    padding: '8px 16px',
    borderBottom: '1px #ccc solid',
    margin: 0,
    color: theme.colors.textColors.text,
    fontSize: 14,
    cursor: 'pointer',
  });

  const handleSelectItem = React.useCallback(
    (event: React.MouseEvent<HTMLLIElement>) => {
      const {value} = event.currentTarget;
      if (selectedChecks.includes(value)) {
        const updatedChecks = selectedChecks.filter(c => c !== value);
        setCheck(updatedChecks);
      } else {
        setCheck(prev => [...prev, value]);
      }
    },
    [selectedChecks],
  );

  const applySelect = React.useCallback(() => {
    onSelect(selectedChecks);
    handleClose();
  }, [handleClose, onSelect, selectedChecks]);

  const isSelected = React.useCallback((checkId: number = -1) => selectedChecks.includes(checkId), [
    selectedChecks,
  ]);

  React.useEffect(() => {
    const handleClickOutside = (e: PointerEvent) => {
      if (e.target instanceof HTMLElement && isOpen) {
        const optionsList = optionsRef?.current;
        const selectInput = mSelectRef?.current;
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
          setSelectRect(mSelectRef?.current.getBoundingClientRect());
        }
      });

    if (isOpen) {
      setSelectRect(mSelectRef?.current.getBoundingClientRect());
      document.addEventListener('click', handleClickOutside);
      window.addEventListener('scroll', handleScroll, true);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [handleClose, isOpen]);

  return (
    <div css={{position: 'relative', width: 300}} ref={mSelectRef}>
      <SelectBox>
        <Span>Prefix: </Span>
        <Span>{selectedChecks.length > 0 ? `(${selectedChecks.length})` : 'All items'}</Span>
      </SelectBox>
      <Dropdown isOpen={isOpen} ref={optionsRef} parentBound={isOpen ? selectRect : undefined}>
        <div css={listBaseCss}>
          <ul>
            {options?.map(option => {
              return (
                <li
                  key={option.id}
                  value={option.id}
                  css={[
                    optionBaseCss,
                    css({
                      backgroundColor: isSelected(Number(option.id))
                        ? theme.colors.pageElementsColors.selectedItem
                        : 'transparent',
                    }),
                  ]}
                  onClick={handleSelectItem}
                >
                  {option.value}
                </li>
              );
            })}
          </ul>
          <button onClick={applySelect}>Apply</button>
        </div>
      </Dropdown>
    </div>
  );
}

export function MultiSelect(props: Props) {
  return (
    <Combobox>
      <Select {...props} />
    </Combobox>
  );
}

/**@ts-ignore */
export const example = `
import React from 'react';
import {css} from '@emotion/core';
import styled from '@emotion/styled';
import {
  ArrowIcon,
  Combobox,
  useCombobox,
  useTheme,
  Span,
  Dropdown,
} from 'neutrino-ui';

type OptionItem = {
  id: string | number;
  value: string | number;
};

type Props = {
  options?: OptionItem[];
  value?: number[];
  onSelect: (values: number[]) => void;
};

const TextBox = styled.div'
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 12px 16px;
';

function SelectBox({children, styles}: any) {
  const {handleToggle, isOpen} = useCombobox();
  const {colors} = useTheme();
  const baseCss = css({
    border: '1px $ {isOpen ? colors.pageElementsColors.activeBorder : colors.pageElementsColors.border} solid',
    '&:hover': {cursor: 'pointer', borderColor: colors.pageElementsColors.activeBorder},
    color: colors.textColors.text,
    backgroundColor: colors.pageElementsColors.formElements,
  });

  return (
    <TextBox onClick={handleToggle} css={[baseCss, styles]}>
      {children}
      <ArrowIcon />
    </TextBox>
  );
}

function Select({options, value, onSelect}: Props) {
  const [selectedChecks, setCheck] = React.useState<number[]>(value);
  const [selectRect, setSelectRect] = React.useState(null);
  const theme = useTheme();
  const mSelectRef = React.useRef<HTMLDivElement>(null);
  const optionsRef = React.useRef<HTMLDivElement>(null);
  const {isOpen, handleClose} = useCombobox();

  const listBaseCss = css({
    margin: 0,
    padding: 0,
    listStyle: 'none',
    border: '1px $ {theme.colors.pageElementsColors.border} solid',
    boxSizing: 'border-box',
    backgroundColor: theme.colors.pageElementsColors.formElements,
    width: '100%',
    height: 200,
    overflow: 'auto',
  });

  const optionBaseCss = css({
    padding: '8px 16px',
    borderBottom: '1px #ccc solid',
    margin: 0,
    color: theme.colors.textColors.text,
    fontSize: 14,
    cursor: 'pointer',
  });

  const handleSelectItem = React.useCallback(
    (event: React.MouseEvent<HTMLLIElement>) => {
      const {value} = event.currentTarget;
      if (selectedChecks.includes(value)) {
        const updatedChecks = selectedChecks.filter(c => c !== value);
        setCheck(updatedChecks);
      } else {
        setCheck(prev => [...prev, value]);
      }
    },
    [selectedChecks],
  );

  const applySelect = React.useCallback(() => {
    onSelect(selectedChecks);
    handleClose();
  }, [handleClose, onSelect, selectedChecks]);

  const isSelected = React.useCallback((checkId: number = -1) => selectedChecks.includes(checkId), [
    selectedChecks,
  ]);

  React.useEffect(() => {
    const handleClickOutside = (e: PointerEvent) => {
      if (e.target instanceof HTMLElement && isOpen) {
        const optionsList = optionsRef?.current;
        const selectInput = mSelectRef?.current;
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
          setSelectRect(mSelectRef?.current.getBoundingClientRect());
        }
      });

    if (isOpen) {
      setSelectRect(mSelectRef?.current.getBoundingClientRect());
      document.addEventListener('click', handleClickOutside);
      window.addEventListener('scroll', handleScroll, true);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [handleClose, isOpen]);

  return (
    <div css={{position: 'relative', width: 300}} ref={mSelectRef}>
      <SelectBox>
        <Span>Prefix: </Span>
        <Span>{selectedChecks.length > 0 ? '($ {selectedChecks.length})' : 'All items'}</Span>
      </SelectBox>
      <Dropdown isOpen={isOpen} ref={optionsRef} parentBound={isOpen ? selectRect : undefined}>
        <div css={listBaseCss}>
          <ul>
            {options?.map(option => {
              return (
                <li
                  key={option.id}
                  value={option.id}
                  css={[
                    optionBaseCss,
                    css({
                      backgroundColor: isSelected(Number(option.id))
                        ? theme.colors.pageElementsColors.selectedItem
                        : 'transparent',
                    }),
                  ]}
                  onClick={handleSelectItem}
                >
                  {option.value}
                </li>
              );
            })}
          </ul>
          <button onClick={applySelect}>Apply</button>
        </div>
      </Dropdown>
    </div>
  );
}

export function MultiSelect(props: Props) {
  return (
    <Combobox>
      <Select {...props} />
    </Combobox>
  );
}

// Somewhere in app...
<MultiSelect options={optionsList} value={items} onSelect={handleMultiSelect} />
`.trim();
