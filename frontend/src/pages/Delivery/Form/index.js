/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { FormContainer, FormLoading, Input, Select } from '~/components/Form';
import { HeaderForm } from '~/components/ActionHeader';

import { SelectContainer } from './styles';

export default function DeliveryForm({ match }) {
  const { id } = match.params;

  const [delivery, setDelivery] = useState({});
  const [recipients, setRecipients] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState([]);
  const [deliverymans, setDeliverymans] = useState([]);
  const [selectedDeliveryman, setSelectedDeliveryman] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    if (id) {
      // eslint-disable-next-line no-inner-declarations
      async function loadDeliveryDetails() {
        try {
          setLoading(true);

          const response = await api.get(`/deliveries/${id}`);

          setDelivery(response.data);
          setSelectedRecipient(response.data.recipient);
          setSelectedDeliveryman(response.data.deliveryman);

          setLoading(false);
        } catch (info) {
          setLoading(false);
          toast.info(
            'Escolha os dados que deseja atualizar da encomenda escolhida'
          );
        }
      }

      loadDeliveryDetails();
    }
  }, [id]);

  useEffect(() => {
    async function loadSelectOptions() {
      const [recipientResponse, deliverymanResponse] = await Promise.all([
        api.get('recipients'),
        api.get('deliverymans')
      ]);

      setRecipients(recipientResponse.data.docs);
      setDeliverymans(deliverymanResponse.data.docs);
    }

    loadSelectOptions();
  }, []);

  const recipientsOptions = recipients.map(recipient => {
    const data = {
      value: recipient,
      label: recipient.name
    };

    return data;
  });

  const handleChangeRecipient = selectedOption => {
    const { value } = selectedOption;

    setSelectedRecipient(value);
  };

  const deliverymansOptions = deliverymans.map(deliveryman => {
    const data = {
      value: deliveryman,
      label: deliveryman.name
    };

    return data;
  });

  const handleChangeDeliveryman = selectedOption => {
    const { value } = selectedOption;

    setSelectedDeliveryman(value);
  };

  async function handleSubmit({ product, deliveryman_id, recipient_id }) {
    try {
      setButtonLoading(true);

      if (id) {
        deliveryman_id = selectedDeliveryman.id;
        recipient_id = selectedRecipient.id;

        const data = { product, deliveryman_id, recipient_id };

        await api.put(`/deliveries/${id}`, data);
      }

      if (!id) {
        deliveryman_id = selectedDeliveryman.id;
        recipient_id = selectedRecipient.id;

        const data = { product, deliveryman_id, recipient_id };

        await api.post('/deliveries', data);
      }

      setButtonLoading(false);

      toast.success('Encomenda salva com sucesso!');
      history.push('/deliveries');
    } catch (err) {
      setButtonLoading(false);
      toast.error('Algo deu errado ao salvar a encomenda');
    }
  }

  return (
    <>
      {loading ? (
        <FormLoading />
      ) : (
        <FormContainer
          initialData={delivery}
          onSubmit={handleSubmit}
          loading={buttonLoading}
        >
          <HeaderForm
            id={id}
            prevPage="/deliveries"
            title="encomendas"
            loading={loading}
          />

          <section>
            <SelectContainer>
              <Select
                name="recipient.name"
                label="Destinatário"
                placeholder="Selecione um destinatário"
                options={recipientsOptions}
                defaultValue={{
                  value: selectedRecipient.id,
                  label: selectedRecipient.name
                }}
                onChange={handleChangeRecipient}
              />
              <Select
                name="deliveryman.name"
                label="Entregador"
                placeholder="Selecione um entregador"
                options={deliverymansOptions}
                defaultValue={{
                  value: selectedDeliveryman.id,
                  label: selectedDeliveryman.name
                }}
                onChange={handleChangeDeliveryman}
              />
            </SelectContainer>

            <Input
              name="product"
              label="Nome do produto"
              placeholder="Ex: Notebook"
            />
          </section>
        </FormContainer>
      )}
    </>
  );
}

DeliveryForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node
    }).isRequired
  }).isRequired
};
