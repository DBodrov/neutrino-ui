import styled from '@emotion/styled';

export const TextBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  width: 100%;
  height: 48px;
  padding: 12px 16px;
`;

export const CalendarButton = styled.button`
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  background-color: transparent;
  border: 0;
  outline: 0;
  cursor: pointer;
`;
