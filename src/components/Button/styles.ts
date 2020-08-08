import styled from 'styled-components';
import { ButtonProps } from './index';

export const Container = styled.button<ButtonProps>`
  background: ${(props) =>
    props.selected ? 'var(--secondary)' : 'var(--black)'};
  width: 100%;
  height: 50px;
  border: 0;
  padding: 0 16px;
  color: var(--white);
  font-weight: 500;
  margin-top: 16px;
  margin-right: 5px;
  transition: background-color 0.2s;

  &:hover {
    background: var(--secondary);
  }
`;
