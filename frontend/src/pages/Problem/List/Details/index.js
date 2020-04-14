import React from 'react';
import { Form } from '@unform/web';
import PropTypes from 'prop-types';

import { MdClose } from 'react-icons/md';

import { Textarea } from '~/components/Form';
import { Container } from './styles';

export default function Details({ visible, problem, handleVisible }) {
  return (
    <>
      <Container visible={visible}>
        <MdClose size={18} color="#DE3B3B" onClick={() => handleVisible()} />

        <Form initialData={problem}>
          <div>
            <strong>VISUALIZAR PROBLEMA</strong>
            <Textarea name="description" readOnly />
          </div>
        </Form>
      </Container>
    </>
  );
}

Details.propTypes = {
  visible: PropTypes.bool.isRequired,
  problem: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  handleVisible: PropTypes.func.isRequired
};
