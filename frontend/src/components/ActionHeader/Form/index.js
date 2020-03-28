import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdCheck, MdChevronLeft } from 'react-icons/md';

import Spinner from '~/components/Spinner';

import { Container } from './styles';

export default function HeaderForm({ id, prevPage, title, loading }) {
  return (
    <Container>
      <h1>{id ? `Edição de ${title}` : `Cadastro de ${title}`}</h1>

      <div>
        <Link to={`${prevPage}`}>
          <MdChevronLeft color="#fff" size={24} />
          VOLTAR
        </Link>

        <button type="submit">
          {loading ? (
            <Spinner />
          ) : (
            <>
              <MdCheck color="#fff" size={22} />
              SALVAR
            </>
          )}
        </button>
      </div>
    </Container>
  );
}

HeaderForm.propTypes = {
  id: PropTypes.string.isRequired,
  prevPage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired
};
