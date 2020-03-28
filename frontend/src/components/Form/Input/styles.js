import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  label {
    color: #444;
    font-weight: bold;
    margin-bottom: 10px;
  }

  input {
    height: 45px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 12px 15px;
    color: #666;
    transition: box-shadow 0.1s, border-color 0.1s;

    &:focus {
      border-color: #7d40e7;
      box-shadow: 0 0 0 1px #7d40e7;
    }

    &::placeholder {
      color: #aaa;
    }
  }

  span {
    color: #de3b3b;
    font-weight: bold;
    margin-top: 5px;
  }
`;
