import styled from 'styled-components/native';

export const Container = styled.View`
  height: 220px;
  width: 100%;
  padding: 15px 12px 10px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 3px #0000001a;
  elevation: 3;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  margin-left: 5px;
  color: #7d40e7;
`;

export const Label = styled.Text`
  font-weight: bold;
  margin-top: 5px;
  font-size: 14px;
  color: #999;
  line-height: 19px;
  text-transform: uppercase;
`;

export const Text = styled.Text`
  font-size: 13px;
  color: #666;
  line-height: 26px;
  margin-bottom: 10px;
`;
