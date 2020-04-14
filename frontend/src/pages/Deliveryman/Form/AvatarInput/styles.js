import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;

  label {
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.7;
    }

    div {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      border: 2px dashed #ddd;

      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      strong {
        margin-top: 5px;
        color: #ccc;
      }
    }

    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      border: 2px solid rgba(255, 255, 255, 0.3);
      background: #eee;
      object-fit: cover;
    }

    input {
      display: none;
    }
  }
`;
