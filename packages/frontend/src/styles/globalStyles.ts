// globalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

html, body {
    height: 100%;
    box-sizing: border-box;
    font-size: calc(13px + (16 - 13) * ((100vw - 1440px) / (1920 - 1440)));
}

body {
    margin: 0;
    padding: 0;
    color: #222222;
    background: linear-gradient(#2F4D6F, #6e839a);
    font-family: 'Montserrat', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
  
#root {
    height: 100%;
}

.App {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    .m-toast{
      .p-toast-top-center{
        top: 50px;
      }
    }
}

.center {
    align-items: center;
    margin-left: auto;
    margin-right: auto;
}

.fadeout {
  -webkit-animation: fadeout .3s linear forwards;
    animation: fadeout .3s linear forwards;
}

[class*="selected--"] {
  font-weight: bold;
}

@-webkit-keyframes fadeout {
  0% { opacity: 1; }
  100% { opacity: 0; }
}

@keyframes fadeout {
  0% { opacity: 1; }
  100% { opacity: 0; }
}

`;

export default GlobalStyle;
