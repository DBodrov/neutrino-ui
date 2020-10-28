import styled from '@emotion/styled';

export const Years = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
  grid-template-rows: repeat(3, minmax(3rem, 1fr));
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 10px;
`;

export const Year = styled.button`
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
