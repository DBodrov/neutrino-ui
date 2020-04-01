import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';
import { baseTheme } from 'neutrino-ui/Themes';

export const Link = styled(NavLink)`
    ${baseTheme.typography.span};
    display: flex;
    flex-flow: row wrap;
    text-decoration: none;
    padding: 0.5rem 1rem;
    font-size: 1rem !important;
    :hover {
        background-color: ${baseTheme.colors.grayColors.gray2};
        cursor: pointer;
    }

`;

export const linkActiveStyle: React.CSSProperties = {
    color: baseTheme.colors.mainColors.secondary,
};
