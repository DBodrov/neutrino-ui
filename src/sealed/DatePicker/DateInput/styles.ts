import styled from '@emotion/styled';

export const DateInputBlock = styled.div`
  display: flex;
  flex-flow: row nowrap;
  position: relative;
`;

export const StyledInput = styled.input`
  padding: 4px 32px 4px 8px;
  width: 100%;
  border: 1px ${props => props.theme.colors.pageElementsColors.border} solid;
  color: ${props => props.theme.colors.textColors.text};
  background-color: ${props => props.theme.colors.pageElementsColors.formElements};
  outline: 0;
  font-size: 1rem;
  &:hover, &:focus {
    border-color: ${props => props.theme.colors.pageElementsColors.activeBorder}
  }
`;
