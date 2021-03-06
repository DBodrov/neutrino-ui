import styled from '@emotion/styled';

export const Days = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(2rem, 1fr));
  grid-template-rows: repeat(6, 2rem);
  gap: 1px;
  width: 100%;
  height: clamp(220px, 250px, 300px);
  align-content: center;
  justify-items: center;
  padding: 10px 8px;
`;

export const DayButton = styled.button`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 32px;
  text-align: center;
  border-radius: 4px;
  user-select: none;
  font-size: 14px;
  background-color: transparent;
  outline: 0;
  border: 0;
`;
