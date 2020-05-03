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
    background-color: ${({theme: {colors}}: any) => colors.pageElementsColors.overlay};
    opacity: 0.7;
    transition: all 0.2s ease-in-out;
`;
