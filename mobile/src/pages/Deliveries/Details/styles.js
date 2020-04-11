import styled from 'styled-components/native';
import { Dimensions, Platform } from 'react-native';

export const Container = styled.View`
  padding: ${Platform.OS === 'ios' ? '78px 20px 20px' : '98px 20px 20px'};
  position: relative;
`;

export const HeaderBackground = styled.View`
  position: absolute;
  background: #7d40e7;
  height: 155px;
  width: ${Dimensions.get('window').width}px;
`;
