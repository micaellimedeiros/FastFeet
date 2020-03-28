import styled from 'styled-components';

export const SelectContainer = styled.div`
  display: flex;

  > div {
    flex: 1;
    margin-bottom: 20px;

    & + div {
      margin-left: 30px;
    }
  }
`;
