import styled from 'styled-components/native';

export const Container = styled.View`
  background: #fff;
  box-shadow: 0 0 3px #0000001a;
  elevation: 3;
  border-radius: 4px;
  height: 56px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px 0 15px;
  margin: 0 2px;
  margin-bottom: 15px;
`;

export const Problem = styled.Text.attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  font-size: 16px;
  line-height: 21px;
  color: #999;
  max-width: 78%;
`;

export const Date = styled.Text`
  font-size: 12px;
  line-height: 16px;
  color: #c1c1c1;
`;
