import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2px;
  margin: 10px 0 50px;

  div {
    color: #444;
  }

  aside {
    display: flex;
    align-items: center;

    button {
      background: #fff;
      border: 1px solid #7d40e7;
      border-radius: 4px;
      padding: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;

      & + button {
        margin-left: 5px;
      }

      &:hover {
        background: #7d40e7;

        & > svg {
          color: #fff;
        }
      }

      svg {
        color: #7d40e7;
      }
    }

    span {
      color: #666;
      font-size: 13px;
      margin: 0 10px;
    }
  }
`;
