import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import AvatarInput from './AvatarInput';

import { FormContainer, FormLoading, Input } from '~/components/Form';
import { HeaderForm } from '~/components/ActionHeader';

export default function DeliverymanForm({ match }) {
  const { id } = match.params;

  const [loading, setLoading] = useState(false);
  const [deliveryman, setDeliveryman] = useState([]);
  const [buttonLoading, setButtonLoading] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    if (id) {
      // eslint-disable-next-line no-inner-declarations
      async function loadDeliverymanDetails() {
        try {
          setLoading(true);

          const response = await api.get(`deliverymans/${id}`);

          setDeliveryman(response.data);

          setLoading(false);
        } catch (err) {
          setLoading(false);
          toast.error('Falha ao carregar dados');
        }
      }
      loadDeliverymanDetails();
    }
  }, [id]);

  async function handleSubmit(data) {
    try {
      setButtonLoading(true);

      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('O nome do entregador é obrigatório'),
        email: Yup.string()
          .email()
          .required('O e-mail do entregador é obrigatório')
      });

      await schema.validate(data, {
        abortEarly: false
      });

      if (id) {
        await api.put(`/deliverymans/${id}`, data);
      }

      if (!id) {
        await api.post('/deliverymans', data);
      }

      setButtonLoading(false);

      toast.success('Entregador salvo com sucesso');
      history.push('/deliverymans');
    } catch (err) {
      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });

        formRef.current.setErrors(validationErrors);

        setButtonLoading(false);
      } else {
        setButtonLoading(false);
        toast.error('Algo deu errado ao salvar o entregador');
      }
    }
  }

  return (
    <>
      {loading ? (
        <FormLoading />
      ) : (
        <FormContainer
          initialData={deliveryman}
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <HeaderForm
            id={id}
            prevPage="/deliverymans"
            title="entregadores"
            loading={buttonLoading}
          />

          <section>
            <AvatarInput name="avatar_id" />

            <Input name="name" label="Nome" placeholder="David Smith" />
            <br />
            <Input
              name="email"
              label="Email"
              placeholder="exemple@rocketseat.com"
            />
          </section>
        </FormContainer>
      )}
    </>
  );
}

DeliverymanForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node
    }).isRequired
  }).isRequired
};
