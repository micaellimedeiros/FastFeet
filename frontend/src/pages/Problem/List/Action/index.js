import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdMoreHoriz, MdVisibility, MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';

import api from '~/services/api';

import { TableAction } from '~/components/Table';

import { Container } from './styles';

export default function Action({ handleDetails, problem, id }) {
  const [visible, setVisible] = useState(false);

  function handleVisible() {
    setVisible(!visible);
  }

  async function handleDelete() {
    try {
      await api.delete(`/problem/${id}/cancel-delivery`);

      toast.success(`Item #${id} deletado com sucesso`);
    } catch (err) {
      toast.error('Ocorreu um erro ao tentar excluir o item');
    }
  }

  function confirmDelete() {
    confirmAlert({
      title: 'Alerta',
      message: `Tem certeza que deseja cancelar a encomenda pertencente ao problema ${id}?`,
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
          <button type="button" onClick={() => handleDetails(problem)}>
            <MdVisibility size={18} color="#8E5BE8" />
            Visualizar
          </button>
        </div>
        <div>
          <button type="button" onClick={confirmDelete}>
            <MdDeleteForever size={18} color="#DE3B3B" />
            Cancelar encomenda
          </button>
        </div>
      </TableAction>
    </Container>
  );
}

Action.propTypes = {
  handleDetails: PropTypes.func.isRequired,
  problem: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  id: PropTypes.number.isRequired
};
