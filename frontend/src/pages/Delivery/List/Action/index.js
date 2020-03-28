import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  MdMoreHoriz,
  MdVisibility,
  MdCreate,
  MdDeleteForever
} from 'react-icons/md';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';

import api from '~/services/api';

import { TableAction } from '~/components/Table';

import { Container } from './styles';

export default function Action({ page, handleDetails, delivery, id }) {
  const [visible, setVisible] = useState(false);

  function handleVisible() {
    setVisible(!visible);
  }

  async function handleDelete() {
    try {
      await api.delete(`/deliveries/${id}`);

      toast.success(`Item #${id} deletado com sucesso`);
    } catch (err) {
      toast.error('Ocorreu um erro ao tentar excluir o item');
    }
  }

  function confirmDelete() {
    confirmAlert({
      title: 'Alerta',
      message: `Tem certeza que deseja deletar a encomenda ${id}?`,
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
          <button type="button" onClick={() => handleDetails(delivery)}>
            <MdVisibility size={18} color="#8E5BE8" />
            Visualizar
          </button>
        </div>
        <div>
          <Link to={page}>
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
  handleDetails: PropTypes.func.isRequired,
  delivery: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  id: PropTypes.number.isRequired
};
