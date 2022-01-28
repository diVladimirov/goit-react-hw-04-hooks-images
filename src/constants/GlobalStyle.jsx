import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
html {
    box-sizing: border-box;
    width: 100vw;
    overflow-x: hidden;
  }
  
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
  
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    color: #212121;
    background-color: #fff;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  img {
    display: block;
    max-width: 100%;
    height: auto;
  }
  p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}
ul,
ol {
  list-style: none;
}
a {
  text-decoration: none;
  color: inherit;
}
button {
    border: none;
  background-color: transparent;   
  cursor: pointer;
}
`;
export default GlobalStyle;
