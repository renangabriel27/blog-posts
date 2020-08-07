import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  padding-top: 50px;
`;

export const Content = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  animation: ${appearFromLeft} 1s;
`;
