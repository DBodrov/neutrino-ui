import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Global} from '@emotion/core';
import styled from '@emotion/styled';
import {Button} from 'neutrino-ui';
import {useMedia} from '../src/utils/use-media';
import {Navbar} from './Navbar';
import {Sidebar} from './Sidebar';
import {Viewarea} from './Viewarea';
import {Main, globalStyles} from './styles';
import {DataProvider} from './providers/DataProvider';

const componentsList = [
  {name: 'Button', link: '/button'},
  {name: 'Checkbox', link: '/checkbox'},
  {name: 'Typography', link: '/typography'},
  {name: 'Input', link: '/input'},
  {name: 'InputMask', link: '/inputmask'},
  {name: 'InputNumber', link: '/inputnumber'},
  {name: 'Select', link: '/select'},
  {name: 'Modal', link: '/modal'},
  {name: 'Switch', link: '/switch'},
  {name: 'DatePicker', link: '/datepicker'},
];

const Line = styled.div`
  width: 35px;
  height: 4px;
  background-color: #7F7F80;
  margin: 4px 0;
`;


export function NeutrinoUI() {
  const [isOpen, setIsOpen] = React.useState(false);
  const isMobile = useMedia('(max-width:540px)');
  return (
    <BrowserRouter>
      <Global styles={globalStyles} />
      <DataProvider context={componentsList}>
        <Navbar />
        <Main>
          <Sidebar isOpen={isOpen} />
          <Viewarea />
          {isMobile ? (
            <Button
              onClick={() => setIsOpen(!isOpen)}
              css={{
                position: 'absolute',
                top: '80%',
                left: 8,
                width: 48,
                height: 48,
                minWidth: 16,
                minHeight: 16,
                zIndex: 2,
                flexFlow: 'column nowrap'

              }}
            >
              <Line />
              <Line />
              <Line />
            </Button>
          ) : null}
        </Main>
      </DataProvider>
    </BrowserRouter>
  );
}
