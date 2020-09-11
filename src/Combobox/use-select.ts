import { useEffect, useCallback, useState } from 'react';
import { ISelectState, SelectChangeTypes } from './types';

export function useSelectEvents(
  selectRef: React.MutableRefObject<HTMLElement>,
  dropdownRef: React.MutableRefObject<HTMLElement>,
  dispatch: React.Dispatch<ISelectState>,
  state: ISelectState,
) {
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (event.target instanceof HTMLElement && state.isOpen) {
        const dropdown = dropdownRef?.current;
        if (dropdown?.contains(event.target)) {
          return;
        }
        dispatch({ type: SelectChangeTypes.clickOutside });
      }
    },
    [dispatch, dropdownRef, state.isOpen],
  );

  useEffect(() => {
    const handleScroll = () => {
      if (state.isOpen) {
        window.requestAnimationFrame(() => dispatch({ type: SelectChangeTypes.scroll }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [dispatch, handleClickOutside, state.isOpen]);
}

export function useClientRect() {
  const [rect, setRect] = useState(null);
  const ref = useCallback((node) => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);
  return [rect, ref];
}
