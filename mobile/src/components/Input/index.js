import React, { forwardRef } from 'react';
import { ViewPropTypes } from 'react-native';

import { Container, TInput } from './styles';

const Input = ({ style, ...rest }, ref) => {
  return (
    <Container style={style}>
      <TInput {...rest} ref={ref} />
    </Container>
  );
};

export default forwardRef(Input);

Input.propTypes = {
  style: ViewPropTypes.style,
};

Input.defaultProps = {
  style: '',
};
