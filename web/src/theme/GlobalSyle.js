import { createGlobalStyle } from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const GlobalSyle = createGlobalStyle`


body {
    background:${({ theme }) => theme.colors.dark}  ; 
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#root {
    width: 80%;
    margin: auto;
    display: block;
    padding: 10px;
    background:${({ theme }) => theme.colors.gray}  ; 
  }

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}

.uppercase {
  text-transform: uppercase;
}

.gray {
  color: #6c757d;
}

`;

export default GlobalSyle;
