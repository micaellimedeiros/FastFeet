import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import PropTypes from 'prop-types';

import { MdClose } from 'react-icons/md';

import { Container, Date } from './styles';

export default function Details({ visible, delivery, handleVisible }) {
  return (
    <>
      <Container visible={visible}>
        <MdClose size={18} color="#DE3B3B" onClick={() => handleVisible()} />

        <Form initialData={delivery}>
          <div>
            <strong>Informações da encomenda</strong>
            <Input name="street_number" readOnly />
            <Input name="city_state" readOnly />
            <Input name="recipient.cep" readOnly />
          </div>
          <div>
            <strong>Datas</strong>
            <Date>
              <strong>Retirada: </strong>
              <Input name="start_date_formatted" readOnly />
            </Date>
            <Date>
              <strong>Entrega: </strong>
              <Input name="end_date_formatted" readOnly />
            </Date>
          </div>
          <div>
            <strong>Assinatura do destinatário</strong>
            {delivery.signature && (
              <img src={delivery.signature.url} alt="assinatura" />
            )}
          </div>
        </Form>
      </Container>
    </>
  );
}

Details.propTypes = {
  visible: PropTypes.bool.isRequired,
  delivery: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  handleVisible: PropTypes.func.isRequired
};
