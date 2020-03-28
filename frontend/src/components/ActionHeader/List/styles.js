import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
  h1 {
    color: #444;
    font-size: 24px;
    margin-bottom: 35px;
  }
  div {
    display: ${props => (props.visible ? 'flex' : 'none')};
    justify-content: space-between;
    align-items: center;
    a {
      display: flex;
      align-items: center;
      background: #7d40e7;
      color: #fff;
      font-weight: bold;
      height: 36px;
      padding: 10px 16px;
      border-radius: 4px;
      transition: background 0.2s;
      &:hover {
        background: ${darken(0.03, '#7d40e7')};
      }
      svg {
        margin-right: 5px;
      }
    }
  }
`;

export const SearchBar = styled.div`
  position: relative;
  input {
    width: 240px;
    height: 36px;
    padding: 10px 10px 10px 40px;
    border-radius: 4px;
    border: 1px solid #ddd;
    transition: box-shadow 0.1s, border-color 0.1s;
    &:focus {
      border-color: #7d40e7;
      box-shadow: 0 0 0 1px #7d40e7;
    }
    &::placeholder {
      color: #999;
    }
  }
  svg {
    position: absolute;
    left: 10px;
  }
`;
