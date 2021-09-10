import styled from '@emotion/styled';

export const StyledList = styled.ul<{isOpen: boolean}>`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4px;
  position: absolute;
  z-index: 10;
  top: 3.5rem;
  left: 0;
  list-style: none;
  margin: 0;
  padding: ${props => (props.isOpen ? '1rem 0' : 0)};
  background-color: #fff;
  width: 100%;
  max-height: 300px;
  height: ${props => (props.isOpen ? '300px' : 0)};
  box-shadow: 0 10px 30px 0 rgb(82 63 105 / 10%);
  border-radius: 0.5rem;
  overflow: auto;
  transition: height 300ms ease;
`;

export const StyledOption = styled.li<{isSelected: boolean}>`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 2rem;
  padding: 0.5rem;
  cursor: pointer;
  background-color: ${props => (props.isSelected ? '#84c5ef' : '#fff')};

  &:hover {
    background-color: var(--a3-color-border);
  }

  &:focus {
    outline: 1px red solid !important;
  }

  &:focus-visible {
    outline: 1px red solid !important;
  }
`;
