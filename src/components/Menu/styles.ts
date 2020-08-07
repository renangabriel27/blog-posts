import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;

  @media (max-width: 480px) {
    flex-wrap: wrap;
  }
`;
