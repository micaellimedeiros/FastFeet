import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 10px;
  height: 45px;
  background: #fff;
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
  border: 1px solid #ddd;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  flex: 1;
  font-size: 16px;
  margin-left: 10px;
  color: #333;
`;
