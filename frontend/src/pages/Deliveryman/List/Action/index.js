import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdMoreHoriz, MdCreate, MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';

import api from '~/services/api';

import { TableAction } from '~/components/Table';

import { Container } from './styles';

export default function Action({ page, id, deliverymans, setDeliverymans }) {
  const [visible, setVisible] = useState(false);

  function handleVisible() {
    setVisible(!visible);
  }

  async function handleDelete() {
    try {
      await api.delete(`/deliverymans/${id}`);

      // eslint-disable-next-line react/prop-types
      const deliverymanFilter = deliverymans.filter(d => d.id !== id);

      setDeliverymans(deliverymanFilter);

      toast.success(`Entregador #${id} deletado com sucesso`);
    } catch (err) {
      toast.error('Ocorreu um erro ao tentar excluir o entregador');
    }
  }

  function confirmDelete() {
    confirmAlert({
      title: 'Alerta',
      message: `Tem certeza que deseja deletar o entregador ${id}?`,
      closeOnEscape: false,
      closeOnClickOutside: false,
      buttons: [
        {
          label: 'Sim',
          onClick: () => handleDelete()
        },
        {
          label: 'Não'
        }
      ]
    });
  }

  return (
    <Container>
      <button onClick={handleVisible} type="button">
        <MdMoreHoriz size={22} color="#c6c6c6" />
      </button>

      <TableAction visible={visible}>
        <div>
          <Link to={`/${page}`}>
            <MdCreate size={18} color="#4D85EE" />
            Editar
          </Link>
        </div>
        <div>
          <button type="button" onClick={confirmDelete}>
            <MdDeleteForever size={18} color="#DE3B3B" />
            Excluir
          </button>
        </div>
      </TableAction>
    </Container>
  );
}

Action.propTypes = {
  page: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  deliverymans: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    .isRequired,
  setDeliverymans: PropTypes.func.isRequired
};
