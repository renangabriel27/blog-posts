import styled from 'styled-components';

export const Container = styled.div`
  background: var(--dark-light);
  border: 1px solid var(--black);
  padding: 20px;
  margin: 10px 0;
  word-wrap: break-word;
  cursor: pointer;

  &:hover {
    border-color: var(--white);
  }
`;

export const Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
`;

export const Description = styled.p`
  margin-top: 15px;
  font-size: 14px;
  font-weight: 400;
`;
