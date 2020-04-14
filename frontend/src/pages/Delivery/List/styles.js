import styled from 'styled-components';
import { darken } from 'polished';

export const ModalTags = styled.div`
  div {
    display: flex;
    flex-direction: column;
    & + div {
      border-top: 1px solid #ddd;
      margin-top: 15px;
      padding-top: 15px;
    }
    strong {
      color: #444444;
      margin-bottom: 5px;
    }
    span {
      font-weight: normal;
      color: #666666;
      font-size: 16px;
      margin-bottom: 5px;
    }
    img {
      width: 235px;
      margin: 20px auto 0;
      object-fit: cover;
    }
  }
`;

export const Status = styled.td`
  span {
    background: ${props => props.status.background} !important;
    color: ${props => props.status.color} !important;
    font-size: 14px;
    font-weight: bold;
    position: relative;
    padding: 3px 7px 3px 25px;
    border-radius: 12px;
    &:before {
      content: '';
      position: absolute;
      height: 10px;
      width: 10px;
      left: 8px;
      top: 8px;
      background: ${props => props.status.color};
      border-radius: 50%;
    }
  }
`;
