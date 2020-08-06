import styled from 'styled-components';

export const Container = styled.div``;

export const Menu = styled.div`
  display: flex;
  flex: 1;

  @media (max-width: 480px) {
    flex-wrap: wrap;
  }
`;
