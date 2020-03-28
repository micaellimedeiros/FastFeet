import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;

  h1 {
    color: #444;
    font-size: 24px;
  }

  div {
    display: flex;
    align-items: center;

    a,
    button {
      width: 112px;
      height: 36px;
      border: 0;
      border-radius: 4px;
      font-weight: bold;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: background 0.2s;

      svg {
        margin-right: 5px;
      }
    }

    a {
      background: #ccc;
      margin-right: 15px;

      &:hover {
        background: ${darken(0.03, '#ccc')};
      }
    }

    button {
      background: #7d40e7;

      &:hover {
        background: ${darken(0.03, '#7d40e7')};
      }
    }
  }
`;
