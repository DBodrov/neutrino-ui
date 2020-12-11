import React from 'react';
import {isEmptyString} from '../utils';
import {useInputMask} from './use-input-mask';

interface IInputMaskProps extends React.HTMLProps<HTMLInputElement> {
  value?: string;
  mask: string;
  maskPlaceholder?: string;
  onChangeHandler: (value: string) => void;
}

function InputMaskComponent(props: IInputMaskProps, ref: React.ForwardRefExoticComponent<HTMLInputElement>) {
  const {mask, value = '', maskPlaceholder, onChangeHandler, ...restProps} = props;
  const inputRef = React.useRef<HTMLInputElement>(null);

  const selectionStart = React.useRef(0);
  const selectionEnd = React.useRef(0);

  React.useImperativeHandle(ref, () => inputRef.current, []);

  const {
    insertText,
    displayValue,
    cursor,
    deleteContentBackward,
    deleteContentForward,
    deleteByCut,
    insertFromPaste,
    insertFromDrop,
    deleteWordBackward,
    deleteWordForward,
    setCursorOnFocus
  } = useInputMask(mask, maskPlaceholder, value, onChangeHandler);

  const prevValue = React.useRef('');

  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
  }, []);

  const handleSelect = React.useCallback((event: React.SyntheticEvent<HTMLInputElement, Event>) => {
    selectionStart.current = event.currentTarget.selectionStart;
    selectionEnd.current = event.currentTarget.selectionEnd;
  }, []);

  const handleKeyDown = React.useCallback((event: React.KeyboardEvent) => {
    const {ctrlKey, metaKey} = event;
    if (ctrlKey || metaKey) {
      return;
    }
    const start = (event.target as HTMLInputElement).selectionStart;
    const end = (event.target as HTMLInputElement).selectionEnd;
    selectionStart.current = start;
    selectionEnd.current = end;
  }, []);

  const handleFocus = React.useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      setCursorOnFocus(event.currentTarget.value);
    },
    [setCursorOnFocus],
  );

  React.useEffect(() => {
    const handleInput = (e: InputEvent) => {
      const el = e.target as HTMLInputElement;
      const inputValue = [...el.value].filter(ch => !isEmptyString(ch) && isFinite(Number(ch))).join('');
      let inputType: string;
      if (!e.inputType && e.data) {
        inputType = 'insertText';
      } else if (!e.inputType && e.data === null) {
        // Maybe test runner worked
        inputType = 'deleteContentBackward';
      } else {
        inputType = e.inputType;
      }
      if (inputType === 'insertText') {
        const _pos = selectionStart.current;
        insertText(inputValue, _pos);
        return;
      }
      if (inputType === 'deleteContentBackward') {
        const _pos = selectionStart.current;
        deleteContentBackward(inputValue, _pos);
        return;
      }
      if (inputType === 'deleteContentForward') {
        const _pos = selectionStart.current;
        deleteContentForward(inputValue, _pos);
        return;
      }
      if (inputType === 'deleteByCut') {
        const _pos = selectionStart.current;
        deleteByCut(inputValue, _pos);
        return;
      }
      if (inputType === 'insertFromPaste') {
        const _pos = selectionEnd.current;
        insertFromPaste(inputValue, _pos);
        return;
      }
      if (inputType === 'insertFromDrop') {
        const _pos = selectionEnd.current;
        insertFromDrop(inputValue, _pos);
        return;
      }
      if (inputType === 'deleteWordBackward') {
        const _pos = el.selectionEnd;
        deleteWordBackward(inputValue, _pos);
        return;
      }
      if (inputType === 'deleteWordForward') {
        const _pos = el.selectionStart;
        deleteWordForward(inputValue, _pos);
        return;
      }
    };

    const inputEl = inputRef.current;
    inputEl.addEventListener('input', handleInput);
    return () => inputEl.removeEventListener('input', handleInput);
  }, [
    deleteByCut,
    deleteContentBackward,
    deleteContentForward,
    deleteWordBackward,
    deleteWordForward,
    insertFromDrop,
    insertFromPaste,
    insertText,
  ]);

  React.useLayoutEffect(() => {
    inputRef.current.setSelectionRange(cursor, cursor);
  });

  React.useEffect(() => {
    if (prevValue.current !== displayValue) {
      prevValue.current = displayValue;
    }
  }, [displayValue]);

  return (
    <input
      onKeyDown={handleKeyDown}
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      onSelect={handleSelect}
      {...restProps}
      ref={inputRef}
      type="tel"
      inputMode="decimal"
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
    />
  );
}

export const InputMask = React.forwardRef(InputMaskComponent);
