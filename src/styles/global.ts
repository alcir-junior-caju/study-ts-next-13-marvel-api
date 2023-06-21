import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #f3f3f3;
    color: #312e38;
    -webkit-font-smoothing: antialiased;
  }

  button {
    cursor: pointer;
  }

  main {
    max-width: calc(100vw - (100vw - 1160px) / 2);
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.8rem;
    margin: 0 auto;
    flex-direction: column;
  }

  input[type="text"] {
    width: 100%;
    padding: 1rem;
    border-radius: 1.5rem;
    border: 2px solid #ccc;
    text-transform: uppercase;
    color: #312e38;

    &::placeholder {
      text-transform: uppercase;
    }

    &:focus {
      border: 2px solid #c0c0c0;
    }
  }
`;
