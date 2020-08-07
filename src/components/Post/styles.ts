import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { shade } from 'polished';

export const Container = styled.div`
  background: #30363f;
  border: 1px solid #000;
  padding: 20px 20px 50px 20px;
  margin: 10px 0;
  cursor: pointer;

  &:hover {
    background: ${shade(0.2, '#30363f')};
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
  color: #fff;
  text-decoration: none;
`;

export const Show = styled(Button)``;

export const Edit = styled(Button)``;

export const Delete = styled.button`
  border: none;
  padding: 5px;
  color: #fff;
  background: transparent;
  text-decoration: none;
`;
