import styled from '@emotion/styled'

export const RangeCalendarBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 490px;
  height: 285px;
  border: 1px ${props => props.theme.colors.pageElementsColors.border} solid;
  background-color: ${props => props.theme.colors.pageElementsColors.formElements};
`;
