import styled from 'styled-components';
import { shade } from 'polished';
import { ButtonProps } from './index';

export const Container = styled.button<ButtonProps>`
  background: ${(props) => (props.selected ? '#ff9000' : '#000')};
  width: 100%;
  height: 50px;
  border: 0;
  padding: 0 16px;
  color: #312e38;
  font-weight: 500;
  margin-top: 16px;
  margin-right: 5px;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#ff9000')};
  }
`;
