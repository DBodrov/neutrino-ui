import React from 'react';
import {animated, useTransition} from 'react-spring';
import {Portal} from '../Portal';
import {ModalChangeTypes, IModalState, IModalProps} from './types';
import {Overlay} from './styles';

const modalReducer = (state: IModalState, changes: IModalState): IModalState => {
  switch (changes.type) {
    case ModalChangeTypes.idle:
    default:
      return changes;

    case ModalChangeTypes.clickOutside:
      return {
        ...state,
        showModal: false,
      };
    case ModalChangeTypes.keyDownEsc:
      return {
        ...state,
        showModal: false,
      };
    case ModalChangeTypes.showModal:
      return {
        ...state,
        showModal: changes.showModal,
      };
  }
};

const initState: IModalState = {
  showModal: false,
  type: ModalChangeTypes.idle,
};

export function Modal(props: IModalProps) {
  const {
    children,
    stateReducer = modalReducer,
    isOpen,
    placement,
    className,
    overlayCss,
    onOverlayClick,
    onClose,
  } = props;
  const modalRef = React.useRef<HTMLDivElement>(null);
  const [{showModal}, dispatch] = React.useReducer(stateReducer, initState);

  const transition = useTransition(showModal, {
    from: {opacity: 0, transform: placement === 'bottom' ? 'translateY(200px)' : 'translateY(-200px)'},
    enter: {opacity: 1, transform: 'translateY(0)'},
    leave: {opacity: 0, transform: 'translateY(200px)'},
  });

  const handleOverlayClick = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (modalRef.current.firstElementChild.contains(event.target as HTMLElement)) {
        return;
      }
      dispatch({type: ModalChangeTypes.clickOutside});
      if (Boolean(onOverlayClick)) {
        onOverlayClick();
      }
    },
    [onOverlayClick],
  );

  React.useEffect(() => {
    dispatch({type: ModalChangeTypes.showModal, showModal: isOpen});
  }, [isOpen]);

  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dispatch({type: ModalChangeTypes.keyDownEsc});
        if (Boolean(onClose)) {
          onClose();
        }
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [onClose]);

  return (
    <Portal>
      {transition((springProps, item, key) => {
        return item ? (
          <Overlay css={[overlayCss]} onClick={handleOverlayClick}>
            <animated.div
              css={{display: 'flex', width: '100%', height: '100%'}}
              className={className}
              style={springProps}
              ref={modalRef}
            >
              {children}
            </animated.div>
          </Overlay>
        ) : null;
      })}
    </Portal>
  );
}
