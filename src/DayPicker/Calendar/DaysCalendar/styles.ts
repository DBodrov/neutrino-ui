import styled from '@emotion/styled';

export const Days = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 2.5rem);
  gap: 1px;
  width: 100%;
  align-content: center;
  justify-items: center;
  padding: 10px 16px;
`;
