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

  &:focus {
    border: 1px var(--a3-color-active-border) solid;
  }
`;
