import styled from '@emotion/styled';

export const RadioInput = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  border: 1px #c7c7c7 solid;
  border-radius: 50%;
  background-color: #fff;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};

  + label {
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  }



  &:checked {
    border: 1px ${props => props.disabled ? '#c7c7c7' : 'var(--a3-color-primary)'} solid;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: 5px;
      left: 5px;
      width: 10px;
      height: 10px;
      border: 1px ${props => props.disabled ? '#c7c7c7' : 'var(--a3-color-primary)'} solid;
      border-radius: 50%;
      background-color: ${props => props.disabled ? '#c7c7c7' : 'var(--a3-color-primary)'};
    }
  }
`;
