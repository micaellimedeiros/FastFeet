import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { HeaderList } from '~/components/ActionHeader';
import { TableContainer, TableLoading } from '~/components/Table';
import Pagination from '~/components/Pagination';
import Action from './Action';

export default function RecipientList() {
  const [recipients, setRecipients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(null);
  const [search, setSearch] = useState('');
  const [totalRecipients, setTotalRecipients] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRecipients() {
      try {
        const response = await api.get('/recipients', {
          params: {
            page: currentPage,
            name: search
          }
        });

        if (!response.data) {
          toast.warn('Nenhum destinatário cadastrado');
        }

        setPages(response.data.pages);
        setTotalRecipients(response.data.total);
        setRecipients(response.data.docs);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        toast.error(
          'Não foi possível carregar as informações dos destinatários'
        );
      }
    }

    loadRecipients();
  }, [currentPage, search]);

  function handlePage(page) {
    if (page === 0) {
      setCurrentPage(1);
    } else if (page > pages) {
      setCurrentPage(pages);
    } else {
      setCurrentPage(page);
    }
  }

  return (
    <>
      <HeaderList
        lowercaseTitle="destinatários"
        page="recipient/new"
        visible
        search={search}
        setSearch={setSearch}
      />
      {loading ? (
        <TableLoading />
      ) : (
        <>
          <TableContainer>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Endereço</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {recipients.map(recipient => (
                <tr key={recipient.id}>
                  <td>#{recipient.id}</td>
                  <td>{recipient.name}</td>
                  <td>
                    {recipient.street}, {recipient.number}, {recipient.city} -{' '}
                    {recipient.state}
                  </td>
                  <Action
                    page={`recipient/edit/${recipient.id}`}
                    id={recipient.id}
                    recipients={recipients}
                    setRecipients={setRecipients}
                  />
                </tr>
              ))}
            </tbody>
          </TableContainer>

          <Pagination
            currentPage={currentPage}
            pages={pages}
            totalDocs={totalRecipients}
            handlePage={handlePage}
          />
        </>
      )}
    </>
  );
}
