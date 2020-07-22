import { useEffect, useCallback, useState } from 'react';
import { State } from './types';

export function useSelectEvents(
  selectRef: React.MutableRefObject<HTMLElement>,
  dropdownRef: React.MutableRefObject<HTMLElement>,
  dispatch: React.Dispatch<State>,
  state: State,
) {
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (event.target instanceof HTMLElement && state.isOpen) {
        const select = selectRef?.current;
        const dropdown = dropdownRef?.current;
        if (select?.contains(event.target) || dropdown?.contains(event.target)) {
          return;
        }
        dispatch({ type: 'CLICK_OUTSIDE' });
      }
    },
    [dispatch, dropdownRef, selectRef, state.isOpen],
  );

  useEffect(() => {
    const handleScroll = () => {
      if (state.isOpen) {
        window.requestAnimationFrame(() => dispatch({ type: 'SCROLL' }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    // window.addEventListener('resize', () => dispatch({type: 'WINDOW_RESIZE'}));
    window.addEventListener('scroll', handleScroll, true);
    // document.addEventListener('keydown', () => );
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
      // window.removeEventListener('resize', calcParentRect);
      // document.removeEventListener('keydown', handleEscPress);
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
