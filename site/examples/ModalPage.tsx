import React, { useState } from 'react';
import { css } from '@emotion/react';
import { Button, H5, Modal, IModalState, ModalChangeTypes } from 'neutrino-ui';
import { Example, Wrapper } from './Example';

const exampleProps = `
export enum ModalChangeTypes {
  idle = 'IDLE',
  clickOutside = 'CLICK_OUTSIDE',
  keyDownEsc = 'KEYDOWN_ESC',
  showModal = 'SHOW_MODAL',
}

export interface IModalState {
  type?: ModalChangeTypes;
  showModal?: boolean;
}

export interface IModalProps {
  stateReducer?: (state: IModalState, changes: IModalState) => IModalState;
  children?: React.ReactNode;
  isOpen: boolean;
  placement?: 'top' | 'center' | 'bottom';
  className?: string;
  overlayCss?: SerializedStyles;
  onClose?: () => void;
  onOverlayClick?: () => void;
}
`.trim();

const exampleCenter = `
import React, { useState } from 'react';
import { css } from '@emotion/core';
import { Button, Modal } from 'neutrino-ui';

const modalReducer = (state: IModalState, changes: IModalState): IModalState => {
  console.log(state, changes)
  switch (changes.type) {
    case ModalChangeTypes.clickOutside:
    case ModalChangeTypes.keyDownEsc:
      return {
        ...state,
        showModal: true
      }
    default:
      return changes;
  }
}

export function Page() {
  const [isOpen, setModalState] = useState(false);
  return (
    <Button css={{ width: '200px' }} onClick={() => setModalState((s) => !s)}>
        Open modal
      </Button>
      <Modal
        stateReducer={modalReducer}
        isOpen={isOpen}
        placement="bottom"
        overlayCss={css({ backgroundColor: 'rgba(49,61,79, 0.5)' })}
        onOverlayClick={() => setModalState(false)}
      >
        <div css={{ width: '500px', height: '300px', borderRadius: 24, backgroundColor: '#fff', margin: 'auto auto 0' }}>
          Modal content!
          <button onClick={() => setModalState(false)}>close</button>
        </div>
      </Modal>
  )
}
`.trim();

const modalReducer = (state: IModalState, changes: IModalState): IModalState => {
  console.log(state, changes);
  switch (changes.type) {
    case ModalChangeTypes.clickOutside:
    case ModalChangeTypes.keyDownEsc:
      return {
        ...state,
        showModal: true,
      };
    default:
      return changes;
  }
};

export function ModalPage() {
  const [isOpen, setModalState] = useState(false);

  return (
    <Wrapper>
      <H5>Modal</H5>
      <Example code={exampleProps} />
      <Button css={{ width: '200px' }} onClick={() => setModalState((s) => !s)}>
        Open modal
      </Button>
      <Modal
        stateReducer={modalReducer}
        isOpen={isOpen}
        placement="bottom"
        overlayCss={css({ backgroundColor: 'rgba(49,61,79, 0.5)' })}
        onOverlayClick={() => setModalState(false)}
      >
        <div
          css={{
            width: '500px',
            height: '300px',
            borderRadius: 24,
            backgroundColor: '#fff',
            margin: 'auto auto 0',
          }}
        >
          Modal content!
          <button onClick={() => setModalState(false)}>close</button>
        </div>
      </Modal>
      <Example code={exampleCenter} />
    </Wrapper>
  );
}
