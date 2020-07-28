import styled from '@emotion/styled';

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
    background-color: rgba(49,61,79, 0.5);
`;
