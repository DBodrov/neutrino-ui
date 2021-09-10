import styled from '@emotion/styled';

export const StyledInput = styled.input`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  min-height: 3rem;
  border: 1px var(--a3-color-border) solid;
  border-radius: 0.475rem;
  cursor: ${props => (props.readOnly ? 'pointer' : 'initial')};
  padding: 0.5rem 1rem;
  outline: 0;
`;

export const StyledList = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  position: absolute;
  z-index: 10;
  top: 3.5rem;
  left: 0;
  list-style: none;
  margin: 0;
  padding: 1rem 0;
  background-color: #fff;
  width: 100%;
  max-height: 300px;
  box-shadow: 0 10px 30px 0 rgb(82 63 105 / 10%);
  /* box-shadow: 0px 5px 20px rgba(0 0 0 0.25); */
  border-radius: 0.475rem;
  overflow: auto;

  &:focus {
    border-color: blue;
  }
`;

export const StyledOption = styled.li`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 2rem;
  padding: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: var(--a3-color-border);
  }

  &:focus,
  &:focus-visible {
    outline: 1px red solid;
  }
`;
