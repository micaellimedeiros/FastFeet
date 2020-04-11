import styled from 'styled-components/native';
import { Dimensions, Platform } from 'react-native';

import Button from '~/components/Button';
import Input from '~/components/Input';

export const Container = styled.View`
  padding: ${Platform.OS === 'ios' ? '78px 20px 20px' : '98px 15px 20px'};
  position: relative;
`;

export const HeaderBackground = styled.View`
  position: absolute;
  background: #7d40e7;
  height: 155px;
  width: ${Dimensions.get('window').width}px;
`;

export const ProblemTextArea = styled(Input).attrs({
  textAlignVertical: 'top',
  padding: 0,
})`
  min-height: 250px;
  font-size: 16px;
  font-weight: 400;
  line-height: 21px;
  padding-bottom: ${Platform.OS === 'ios' ? '190px' : '50px'};
  flex: 1;
  text-align: center;
  box-shadow: 0 0 3px #0000001a;
  elevation: 3;
  border: 0;
  margin: 0 5px;
`;

export const SubmitButton = styled(Button)`
  margin: ${Platform.OS === 'ios' ? '20px 0 10px' : '20px 5px 10px'};
  background: #7d40e7;
`;
