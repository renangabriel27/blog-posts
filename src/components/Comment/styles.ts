import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  background: #30363f;
  border: 1px solid #000;
  padding: 10px;
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
