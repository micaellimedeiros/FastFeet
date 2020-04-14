import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import {
  FormContainer,
  FormLoading,
  Input,
  InputMask
} from '~/components/Form';
import { HeaderForm } from '~/components/ActionHeader';

import { InputContainer1, InputContainer2 } from './styles';

export default function RecipientForm({ match }) {
  const { id } = match.params;

  const [loading, setLoading] = useState(false);
  const [recipient, setRecipient] = useState([]);
  const [buttonLoading, setButtonLoading] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    if (id) {
      // eslint-disable-next-line no-inner-declarations
      async function loadRecipientDetails() {
        try {
          setLoading(true);

          const response = await api.get(`recipients/${id}`);

          setRecipient(response.data);

          setLoading(false);
        } catch (info) {
          setLoading(false);
          toast.info('Insira os novos dados para atualizar o destinatário.');
        }
      }
      loadRecipientDetails();
    }
  }, [id]);

  async function handleSubmit(data) {
    try {
      setButtonLoading(true);

      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('O nome do destinatário é obrigatório'),
        street: Yup.string().required('A rua do destinatário é obrigatório'),
        number: Yup.number('Certifique-se que um número foi digitado').required(
          'O número do destinatário é obrigatório'
        ),
        complement: Yup.string(),
        city: Yup.string().required('A cidade do destinatário é obrigatória'),
        state: Yup.string().required('O estado do destinatário é obrigatório'),
        cep: Yup.string().required('O CEP do destinatário é obrigatório')
      });

      await schema.validate(data, {
        abortEarly: false
      });

      if (id) {
        await api.put(`/recipients/${id}`, data);
      }

      if (!id) {
        await api.post('/recipients', data);
      }

      setButtonLoading(false);

      toast.success('Destinatário salvo com sucesso');
      history.push('/recipients');
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
        toast.error('Algo deu errado ao salvar o destinatário');
      }
    }
  }

  return (
    <>
      {loading ? (
        <FormLoading />
      ) : (
        <FormContainer
          initialData={recipient}
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <HeaderForm
            id={id}
            prevPage="/recipients"
            title="destinatário"
            loading={buttonLoading}
          />

          <section>
            <Input name="name" label="Nome" placeholder="David Smith" />
            <InputContainer1>
              <Input name="street" label="Rua" placeholder="Rua Cleveland" />
              <Input name="number" label="Número" placeholder="1743" />
              <Input name="complement" label="Complemento" />
            </InputContainer1>
            <InputContainer2>
              <Input name="city" label="Cidade" placeholder="Washington" />
              <Input name="state" label="Estado" placeholder="São Paulo" />
              <InputMask
                name="cep"
                label="CEP"
                mask="99999-999"
                maskChar=""
                placeholder="99 9966-5500"
              />
            </InputContainer2>
          </section>
        </FormContainer>
      )}
    </>
  );
}

RecipientForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node
    }).isRequired
  }).isRequired
};
