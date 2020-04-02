import React from 'react';
import styled from '@emotion/styled';
import { baseTheme, H5 } from 'neutrino-ui';
// import { H5, baseTheme } from '@elements-ui/react';
import logo from '../assets/elements-logo.png';

const Nav = styled.div`
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    height: 80px;
    background-color: ${baseTheme.colors.grayColors.gray1};
    border-bottom: 1px ${baseTheme.colors.pageElementsColors.border} solid;
`;

const Logo = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    width: 250px;
    height: 80px;
`;

export function Navbar() {
    return (
        <Nav>
            <Logo>
                <img css={{ width: '80px', height: '80px', display: 'flex' }} src={logo} alt="Neutrino-UI" />
                <H5 css={{ paddingLeft: '1rem' }}>Neutrino-UI</H5>
            </Logo>
        </Nav>
    );
}
