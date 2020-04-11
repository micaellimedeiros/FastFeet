import styled from 'styled-components/native';
import { Dimensions, Platform } from 'react-native';

import Button from '~/components/Button';

export const Container = styled.View`
  padding: ${Platform.OS === 'ios' ? '78px 20px 20px' : '98px 20px 20px'};
  position: relative;
  flex: 1;
`;

export const HeaderBackground = styled.View`
  position: absolute;
  background: #7d40e7;
  height: 155px;
  width: ${Dimensions.get('window').width}px;
`;

export const CameraWrapper = styled.View`
  flex: 1;
`;

export const CameraButtonWrapper = styled.View`
  height: 60px;
  width: 60px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  background: #0000004d;
`;

export const CameraButton = styled.TouchableOpacity``;

export const ConfirmButton = styled(Button)`
  margin: 20px 0 10px;
  background: #7d40e7;
`;

export const CancelButtonWrapper = styled.View`
  height: 60px;
  width: 60px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  background: #0000004d;
  text-align: center;
  margin: 0 auto;
  position: absolute;
  bottom: 0;
  left: ${(Dimensions.get('window').width - 100) / 2}px;
`;

export const CancelButton = styled.TouchableOpacity``;

export const Preview = styled.Image`
  flex: 1;
`;
