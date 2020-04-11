import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

export const Container = styled.View`
  height: 85px;
  width: 100%;
  background: #f8f9fd;
  border-radius: 4px;
  box-shadow: 0 0 3px #0000001a;
  elevation: 3;
  margin-top: 10px;
  flex-direction: row;
  justify-content: space-around;
`;

export const Label = styled.Text`
  font-size: 11px;
  color: #999;
  line-height: 16px;
  text-align: center;
  width: 56px;
`;

export const Left = styled.TouchableOpacity`
  height: 100%;
  width: ${(Dimensions.get('window').width - 20) / 3}px;
  align-items: center;
  justify-content: center;

  border-right-color: #0000001a;
  border-style: solid;
  border-right-width: 1px;
`;

export const Center = styled.TouchableOpacity`
  height: 100%;
  width: ${(Dimensions.get('window').width - 20) / 3}px;
  align-items: center;
  justify-content: center;
`;

export const Right = styled.TouchableOpacity`
  height: 100%;
  width: ${(Dimensions.get('window').width - 20) / 3}px;
  align-items: center;
  justify-content: center;

  border-left-color: #0000001a;
  border-style: solid;
  border-left-width: 1px;
`;
