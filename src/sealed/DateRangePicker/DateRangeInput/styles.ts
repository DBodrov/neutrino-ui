import styled from '@emotion/styled';

export const DateRangeInputBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 36px;
  padding: 0;
  cursor: pointer;
  border: 1px ${props => props.theme.colors.pageElementsColors.border} solid;
  background-color: ${props => props.theme.colors.pageElementsColors.formElements};
  &:hover {
    border-color: ${props => props.theme.colors.mainColors.primary};
  }
`;

export const DateRangeInputSection = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 50%;
  height: 100%;
  padding: 10px;
  &:first-of-type {
    border-right: 1px ${props => props.theme.colors.pageElementsColors.border} solid;
  }
`;
