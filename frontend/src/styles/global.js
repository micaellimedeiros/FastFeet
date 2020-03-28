import { createGlobalStyle } from 'styled-components';
import { darken } from 'polished';

import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  html, body, #root {
    height: 100%;
    background: #f5f5f0;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  body, button, input {
    font: 14px 'Roboto', sans-serif;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }

  .foo {
    border-radius: 4px;
    font-size: 16px;
    padding: 20px;
  }

  .react-confirm-alert-overlay {
    background: rgba(0, 0, 0, 0.65);

    .react-confirm-alert-body {
      border-radius: 4px;
      font-size: 16px;
      width: 400px;
      height: 200px;
      box-shadow: none;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      h1 {
        margin-bottom: 10px;
        align-self: flex-start;
      }

      .react-confirm-alert-button-group {
        justify-content: space-between;
        width: 100%;

        button {
          height: 36px;
          width: 120px;
          font-size: 16px;
          width: 100%;
          transition: background 0.2s;

          &:nth-child(1) {
            border: 1px solid #7D40E7;
            background: #fff;
            color: #7D40E7;

            &:hover {
              background: #7D40E7;
              color: #fff;
            }
          }

          &:nth-child(2) {
            background: #7D40E7;
            color: #fff;

            &:hover {
              background: ${darken(0.03, '#7D40E7')}
            }
          }
        }
      }
    }
  }
`;
