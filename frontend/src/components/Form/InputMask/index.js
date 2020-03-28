import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';
import ReactInputMask from 'react-input-mask';

import { Container } from './styles';

export default function InputMask({ name, label, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    });
  }, [fieldName, registerField]);
  return (
    <Container>
      <label>{label}</label>
      <ReactInputMask ref={inputRef} defaultValue={defaultValue} {...rest} />
    </Container>
  );
}

InputMask.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};
