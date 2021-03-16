import React from 'react';
import {useDatePicker} from '../DatePickerProvider';
import {removeMask, createDisplayValue} from '../utils/format';
import {StyledInput} from './styles';

type TCursorPosition = {
  cursorStart?: number;
  cursorEnd?: number;
};

function DateInputComponent(props: any, ref?: React.ForwardRefExoticComponent<HTMLInputElement>) {
  const {handleInputDate, name, value, inputStyles, format, onBlur, inputProps} = useDatePicker();
  const [{cursorStart, cursorEnd}, setCursor] = React.useReducer(
    (s: TCursorPosition, a: TCursorPosition): TCursorPosition => ({...s, ...a}),
    {
      cursorStart: undefined,
      cursorEnd: undefined,
    },
  );
  const [updateKey, forceUpdate] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useImperativeHandle(ref, () => inputRef.current, []);

  const inputType = React.useRef<string>('');

  const handleDateChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = removeMask('_', e.currentTarget.value);
      const displayValue = createDisplayValue(rawValue, format);
      let updatedCursor = cursorStart;

      switch (inputType.current) {
        default:
        case 'insertText': {
          if ([2, 5].includes(cursorStart)) {
            updatedCursor = cursorStart + 2;
          } else {
            updatedCursor = cursorStart + 1;
          }
          setCursor({cursorStart: updatedCursor, cursorEnd: updatedCursor});
          break;
        }
        case 'deleteContentBackward': {
          // if ([3, 6].includes(cursorStart)) {
          // } else {
          //   selectionStart.current = cursor - 1;
          //   selectionEnd.current = cursor - 1;
          // }
          updatedCursor = cursorStart - 1;
          setCursor({cursorStart: updatedCursor, cursorEnd: updatedCursor});
          break;
        }
        case 'deleteContentForward': {
          setCursor({cursorStart: updatedCursor, cursorEnd: updatedCursor});
          forceUpdate(s => s + 1);
          break;
        }
        case 'deleteSection': {
          setCursor({cursorStart: updatedCursor, cursorEnd: updatedCursor});
          break;
        }
        case 'insertFromPaste': {
          updatedCursor = displayValue.length;
          setCursor({cursorStart: updatedCursor, cursorEnd: updatedCursor});
          break;
        }
      }
      handleInputDate(displayValue);
    },
    [cursorStart, format, handleInputDate],
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
    setCursor({cursorStart: start, cursorEnd: end});
  }, []);

  const handlePaste = React.useCallback(() => {
    inputType.current = 'insertFromPaste';
  }, []);

  React.useLayoutEffect(() => {
    inputRef.current.setSelectionRange(cursorStart, cursorEnd);
  }, [cursorStart, cursorEnd, updateKey]);

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
      autoFocus={false}
      {...inputProps}
    />
  );
}

export const DateInput = React.forwardRef(DateInputComponent);
