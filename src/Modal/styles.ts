import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { IModalProps } from './Modal';

export const Overlay = styled.div`
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100vw;
    height: 100vh;
    min-height: 100%;
    overflow: hidden;
    transition: all 0.2s ease-in-out;
`;

export function modalStyles(props: IModalProps) {
    const {title, placement, styles} = props;
    const margin = placement === 'top' ? '1rem auto' : placement === 'bottom' ? 'auto auto 0' : 'auto';
    return css({
        display: 'grid',
        gridTemplateColumns: '100%',
        gridTemplateRows: title ? 'minmax(0.5rem, 2rem) minmax(0, 1fr)' : 'minmax(0, 1fr)',
        width: '40vmax',
        minWidth: '20rem',
        height: '40vmin',
        minHeight: '10rem',
        borderRadius: '4px',
        boxShadow: '0px 3px 1px 7px #ffffff',
        backgroundColor: '#ffffff',
        overflow: 'hidden',
        padding: '0.5rem 0',
        margin,
        '@media (max-width: 320px)': {
            minWidth: '100%'
        },
        ...styles
    });
}

export const DissmissButton = styled.button`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    position: absolute;
    border: 0;
    background-color: transparent;
    top: 1rem;
    right: 1rem;
    width: 1rem;
    height: 1rem;
    user-select: none;

    &:focus,
    &:active {
        border: 0;
        outline: 0;
    }

    &:hover {
        cursor: pointer;
    }
`;
