import styled from '@emotion/styled';

export const Months = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, minmax(3rem, 1fr));
  gap: 5px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 10px;
`;

export const Month = styled.button`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
  border-radius: 4px;
  user-select: none;
  font-size: 14px;
  background-color: transparent;
  outline: 0;
  border: 0;
`;
