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

  React.useEffect(() => {
    const handleInput = (e: InputEvent) => {
      // console.log('**** input type ****', e.inputType);
      const el = e.target as HTMLInputElement;
      const inputValue = [...el.value].filter(ch => !isEmptyString(ch) && isFinite(Number(ch))).join('');
      if (e.inputType === 'insertText') {
        const _pos = selectionStart.current;
        insertText(inputValue, _pos);
        return;
      }
      if (e.inputType === 'deleteContentBackward') {
        const _pos = selectionStart.current;
        deleteContentBackward(inputValue, _pos);
        return;
      }
      if (e.inputType === 'deleteContentForward') {
        const _pos = selectionStart.current;
        deleteContentForward(inputValue, _pos);
        return;
      }
      if (e.inputType === 'deleteByCut') {
        const _pos = selectionStart.current;
        deleteByCut(inputValue, _pos);
        return;
      }
      if (e.inputType === 'insertFromPaste') {
        const _pos = selectionEnd.current;
        insertFromPaste(inputValue, _pos);
        return;
      }
      if (e.inputType === 'insertFromDrop') {
        const _pos = selectionEnd.current;
        insertFromDrop(inputValue, _pos);
        return;
      }
      if (e.inputType === 'deleteWordBackward') {
        const _pos = el.selectionEnd;
        deleteWordBackward(inputValue, _pos);
        return;
      }
      if (e.inputType === 'deleteWordForward') {
        const _pos = el.selectionStart;
        deleteWordForward(inputValue, _pos);
        return;
      }
      // if (e.inputType === 'historyUndo') {

      //   historyUndo(prevValue.current);
      //   return;
      // }

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
    // console.log('layout cursor ', cursor);
    inputRef.current.setSelectionRange(cursor, cursor);
  }, [cursor, displayValue]);

  React.useEffect(() => {
    prevValue.current = displayValue;
  }, [displayValue]);

  return (
    <input
      onKeyDown={handleKeyDown}
      value={displayValue}
      onChange={handleChange}
      onSelect={handleSelect}
      {...restProps}
      ref={inputRef}
      type="tel"
    />
  );
}

export const InputMask = React.forwardRef(InputMaskComponent);
