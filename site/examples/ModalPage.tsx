import React, { useState } from 'react';
import { ThemeProvider } from 'emotion-theming';
import { Button, createTheme, Modal } from 'neutrino-ui';
import { Example, Wrapper } from './Example';

const exampleProps = `
export interface IModalProps {
    isOpen: boolean;
    clickClose?: boolean;
    escClose?: boolean;
    styles?: React.CSSProperties;
    placement?: 'top' | 'center' | 'bottom';
    title?: string;
    showClose?: boolean;
    onClose: () => void;
    children: React.ReactNode;
}
`.trim();

const exampleCenter = `
import React, { useState } from 'react';
import { Button, Modal } from 'neutrino-ui';

export function Page() {
  const [isOpen, setModalState] = useState(false);
  return (
      <Button css={{width: '200px'}} onClick={() => setModalState(true)}>Open modal center</Button>
          <Modal escClose clickClose showClose isOpen={isOpen} onClose={() => setModalState(false)} styles={{width: '60%'}}>
              <div css={{width: '100%', height: '100%', backgroundColor: '#fff', opacity: 1}}>
                  Modal content!
              </div>
          </Modal>
  )
}
`.trim();

const exampleThemedOverlay = `
import React, { useState } from 'react';
import { ThemeProvider } from 'emotion-theming';
import { Button, Modal, createTheme } from 'neutrino-ui';

const theme = createTheme({
    colors: {
        pageElementsColors: {
            overlay: '#008080',
        },
    },
});

export function Page() {
  const [isOpenThemed, setModalThemedState] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <Button css={{ width: '200px', marginTop: 10 }} onClick={() => setModalThemedState(true)}>
        Open with themed overlay
      </Button>
      <Modal
        escClose
        clickClose
        showClose
        isOpen={isOpenThemed}
        onClose={() => setModalThemedState(false)}
        styles={{ width: '60%' }}>
        <div css={{ width: '100%', height: '100%', backgroundColor: '#fff', opacity: 1 }}>
            Modal content!
        </div>
      </Modal>
  </ThemeProvider>
  )
}
`.trim();

const theme = createTheme({
    colors: {
        pageElementsColors: {
            overlay: '#008080',
        },
    },
});

export function ModalPage() {
    const [isOpen, setModalState] = useState(false);
    const [isOpenBottom, setModalBottomState] = useState(false);
    const [isOpenTop, setModalTopState] = useState(false);
    const [isOpenThemed, setModalThemedState] = useState(false);

    return (
        <Wrapper>
            <Example code={exampleProps} />
            <Button css={{ width: '200px' }} onClick={() => setModalState(true)}>
                Open modal center
            </Button>
            <Modal
                escClose
                clickClose
                showClose
                isOpen={isOpen}
                onClose={() => setModalState(false)}
                styles={{ width: '60%' }}>
                <div css={{ width: '100%', height: '100%', backgroundColor: '#fff', opacity: 1 }}>
                    Modal content!
                </div>
            </Modal>
            <Example code={exampleCenter} />
            <Button
                variant="primary"
                css={{ marginTop: '10px', width: '200px' }}
                onClick={() => setModalBottomState(true)}>
                Open modal bottom
            </Button>
            <Modal
                escClose
                clickClose
                showClose
                isOpen={isOpenBottom}
                placement="bottom"
                onClose={() => setModalBottomState(false)}
                styles={{ width: '60%' }}>
                <div css={{ width: '100%', height: '100%', backgroundColor: '#fff', opacity: 1 }}>
                    Modal content on bottom!
                </div>
            </Modal>
            <Example code="<Modal placement='bottom'>....</Modal>" />
            <Button
                variant="secondary"
                outline
                css={{ marginTop: '10px', width: '200px' }}
                onClick={() => setModalTopState(true)}>
                Open modal top
            </Button>
            <Modal
                escClose
                clickClose
                showClose
                isOpen={isOpenTop}
                placement="top"
                onClose={() => setModalTopState(false)}
                styles={{ width: '60%' }}>
                <div css={{ width: '100%', height: '100%', backgroundColor: '#fff', opacity: 1 }}>
                    Modal content on top!
                </div>
            </Modal>
            <Example code="<Modal placement='top'>....</Modal>" />
            <ThemeProvider theme={theme}>
                <Button css={{ width: '200px', marginTop: 10 }} onClick={() => setModalThemedState(true)}>
                    Open with themed overlay
                </Button>
                <Modal
                    escClose
                    clickClose
                    showClose
                    isOpen={isOpenThemed}
                    onClose={() => setModalThemedState(false)}
                    styles={{ width: '60%' }}>
                    <div css={{ width: '100%', height: '100%', backgroundColor: '#fff', opacity: 1 }}>
                        Modal content!
                    </div>
                </Modal>
            </ThemeProvider>
            <Example code={exampleThemedOverlay}/>
        </Wrapper>
    );
}
