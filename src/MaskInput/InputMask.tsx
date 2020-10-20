import React from 'react';
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

  const {insertText} = useInputMask(mask, maskPlaceholder, value);

  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
  }, [])

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
      //console.log(e.inputType);
      //changeType.current = getInputType(e.inputType);
      //pressedKey.current = e.inputType;
      // console.log(pressedKey.current);
      const el = e.target as HTMLInputElement;
      const inputValue = el.value;
      // console.log('input', inputValue);
      if (e.inputType === 'insertText') {
        const maskedValue = insertText(inputValue);
        onChangeHandler(maskedValue);

      }
    };

    const inputEl = inputRef.current;
    inputEl.addEventListener('input', handleInput);
    return () => inputEl.removeEventListener('input', handleInput);
  }, [insertText])
  return (
    <input onKeyDown={handleKeyDown} value={value} onChange={handleChange} {...restProps} ref={inputRef}/>
  )
}

export const InputMask = React.forwardRef(InputMaskComponent);
