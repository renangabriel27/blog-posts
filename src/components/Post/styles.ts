import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  background: var(--dark-light);
  border: 1px solid var(--black);
  padding: 20px 20px 50px 20px;
  margin: 10px 0;
  word-wrap: break-word;
  cursor: pointer;

  &:hover {
    border-color: var(--white);
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
`;

export const Description = styled.p`
  margin-top: 15px;
  font-size: 14px;
  font-weight: 400;
`;

export const Buttons = styled.div`
  display: flex;
  place-content: flex-end;
`;

export const Button = styled(Link)`
  border: none;
  padding: 5px;
  margin-right: 2px;
  color: var(--white);
  text-decoration: none;
`;

export const Show = styled(Button)``;

export const Edit = styled(Button)``;

export const Delete = styled.button`
  border: none;
  padding: 5px;
  color: var(--white);
  background: transparent;
  text-decoration: none;
`;
