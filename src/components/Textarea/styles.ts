import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;

  background: var(--dark-light);
  border: 1px solid var(--dark-light);

  margin: 20px 0;
  padding: 20px;
  width: 100%;

  ${(props) =>
    props.isErrored &&
    css`
      border-color: var(--error);
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: var(--white);
      border-color: var(--white);
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: var(--secondary);
    `}

  textarea {
    flex: 1;
    background: none;
    border: 0;
    color: var(--white);
    height: 100px;
    font-family: IBM Plex Mono, serif;
    font-size: 16px;
  }

  svg {
    margin-right: 16px;
  }
`;

export const ErrorMessage = styled.p`
  color: var(--error);
`;
