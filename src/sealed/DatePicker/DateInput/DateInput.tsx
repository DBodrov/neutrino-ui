import React from 'react';
import {useDatePicker} from '../DatePickerProvider';
import {removeMask, createDisplayValue} from '../utils/format';
import {StyledInput} from './styles';

function DateInputComponent(props: any, ref?: React.ForwardRefExoticComponent<HTMLInputElement>) {
  const {handleInputDate, name, value, inputStyles, format, onBlur} = useDatePicker();
  const [, forceUpdate] = React.useState({});
  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useImperativeHandle(ref, () => inputRef.current, []);

  const selectionStart = React.useRef(0);
  const selectionEnd = React.useRef(0);
  const inputType = React.useRef<string>('');

  const handleDateChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = removeMask('_', e.currentTarget.value);
      const cursor = selectionStart.current;
      const displayValue = createDisplayValue(rawValue, format);

      switch (inputType.current) {
        default:
        case 'insertText': {
          if ([2, 5].includes(cursor)) {
            selectionStart.current = cursor + 2;
            selectionEnd.current = cursor + 2;
          } else {
            selectionStart.current = cursor + 1;
            selectionEnd.current = cursor + 1;
          }
          break;
        }
        case 'deleteContentBackward': {
          if ([3, 6].includes(cursor)) {
            selectionStart.current = cursor - 1;
            selectionEnd.current = cursor - 1;
            forceUpdate({});
          } else {
            selectionStart.current = cursor - 1;
            selectionEnd.current = cursor - 1;
          }
          break;
        }
        case 'deleteContentForward': {
          selectionStart.current = cursor;
          selectionEnd.current = cursor;
          forceUpdate({});
          break;
        }
        case 'deleteSection': {
          selectionStart.current = cursor;
          selectionEnd.current = cursor;
          forceUpdate({});
          break;
        }
        case 'insertFromPaste': {
          selectionStart.current = displayValue.length;
          selectionEnd.current = displayValue.length;
          break;
        }
      }
      handleInputDate(displayValue);
    },
    [format, handleInputDate],
  );

  const handleKeyDown = React.useCallback((event: React.KeyboardEvent) => {
    const {ctrlKey, metaKey, key} = event;
    const isNumericKey = isFinite(Number(key));
    if (ctrlKey || metaKey) {
      return;
    }
    const start = (event.target as HTMLInputElement).selectionStart;
    const end = (event.target as HTMLInputElement).selectionEnd;

    if (start === end) {
      if (isNumericKey) {
        inputType.current = 'insertText';
      } else if (key === 'Backspace') {
        inputType.current = 'deleteContentBackward';
      } else if (key === 'Delete') {
        inputType.current = 'deleteContentForward';
      }
    } else {
      if (isNumericKey) {
        inputType.current = 'insertText';
      } else if (key === 'Backspace') {
        inputType.current = 'deleteSection';
      } else if (key === 'Delete') {
        inputType.current = 'deleteSection';
      }
    }

    selectionStart.current = start;
    selectionEnd.current = end;
  }, []);

  const handlePaste = React.useCallback(() => {
    inputType.current = 'insertFromPaste';
  }, []);

  React.useLayoutEffect(() => {
    inputRef.current.setSelectionRange(selectionStart.current, selectionEnd.current);
  });

  return (
    <StyledInput
      name={name}
      onChange={handleDateChange}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      onBlur={onBlur}
      value={value}
      ref={inputRef}
      css={inputStyles}
      inputMode="decimal"
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
    />
  );
}

export const DateInput = React.forwardRef(DateInputComponent);
