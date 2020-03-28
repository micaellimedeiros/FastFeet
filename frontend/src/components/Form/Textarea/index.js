import React, { useRef, useEffect } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';

export default function TextArea({ name, ...rest }) {
  const textAreaRef = useRef(null);
  const { defaultValue, fieldName, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textAreaRef.current,
      path: '_input.value'
    });
  }, [fieldName, registerField]);

  return (
    <TextareaAutosize
      id={fieldName}
      defaultValue={defaultValue}
      ref={textAreaRef}
      {...rest}
    />
  );
}

TextArea.propTypes = {
  name: PropTypes.string.isRequired
};
