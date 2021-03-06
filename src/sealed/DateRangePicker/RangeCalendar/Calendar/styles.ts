import styled from '@emotion/styled';

export const CalendarBlock = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 50%;
  min-height: 250px;
  height: 100%;
  &:first-of-type {
    border-right: 1px ${props => props.theme.colors.pageElementsColors.border} solid;
  }
`;
