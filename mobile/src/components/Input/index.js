/* eslint-disable react/jsx-props-no-spreading */
import React, { forwardRef } from 'react';

import { Container, TInput } from './styles';

function Input({ style, ...rest }, ref) {
  return (
    <Container style={style}>
      <TInput {...rest} ref={ref} />
    </Container>
  );
}
export default forwardRef(Input);
