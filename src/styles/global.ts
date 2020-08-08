import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  input {
    min-height: 100%;
  }

  body {
    background: var(--background);
    color: var(--white);
    -webkit-font-smoothing: antiliased;
  }

  body, input, button {
    font-family: IBM Plex Mono, serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 700;
  }

  button {
    cursor: pointer;
  }

  :root {
    --background: #23292e;
    --secondary: #ff9000;
    --dark-light: #30363f;
    --error: #c53030;
    --black: #000;
    --white: #fff;
  }
`;
