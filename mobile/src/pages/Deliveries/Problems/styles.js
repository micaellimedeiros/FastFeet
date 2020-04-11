import styled from 'styled-components/native';
import { Dimensions, Platform } from 'react-native';

export const Container = styled.View`
  padding: ${Platform.OS === 'ios' ? '78px 20px 20px' : '88px 20px 20px'};
  position: relative;
`;

export const HeaderBackground = styled.View`
  position: absolute;
  background: #7d40e7;
  height: 155px;
  width: ${Dimensions.get('window').width}px;
`;

export const Title = styled.Text`
  font-weight: bold;
  text-align: center;
  font-size: 18px;
  color: #fff;
  margin-bottom: 12.5px;
`;

export const ProblemsList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingBottom: 50 },
})``;
