import styled from 'styled-components';

export const Container = styled.div`
  display: ${props => (props.visible ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  padding: 15px;
  background: #fff;
  box-shadow: 10px 10px 10px 10000px rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  z-index: 3;
  svg {
    align-self: flex-end;
    &:hover {
      cursor: pointer;
    }
  }
  form {
    padding: 0 15px 15px;
    div {
      display: flex;
      flex-direction: column;
    }
    strong {
      margin-bottom: 15px;
      color: #444;
    }
    textarea {
      font-size: 16px;
      color: #666;
      border: 0;
      resize: unset;
    }
  }
`;
