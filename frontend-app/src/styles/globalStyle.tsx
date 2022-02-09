import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    text-decoration: none !important;
  }

  body {
    background-color: #f8f8fa !important;
    -webkit-font-smoothing: antialiased;
  }
  body, input, button {
    font: 1.2rem Roboto, sans-serif;
  }
  button {
    cursor: pointer;
  }
`;