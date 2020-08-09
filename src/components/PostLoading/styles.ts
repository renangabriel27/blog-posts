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

export const Title = styled.div`
  width: 200px;
  height: 30px;
  margin-top: 30px;
  background: var(--gray-light);
`;

export const Description = styled.div`
  margin-top: 25px;
  width: 100%;
  height: 70px;
  background: var(--gray-light);
`;

export const Creator = styled.div`
  margin-top: 40px;
  width: 150px;
  height: 15px;
  background: var(--gray-light);
`;
