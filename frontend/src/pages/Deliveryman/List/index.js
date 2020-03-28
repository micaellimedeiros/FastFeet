import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { HeaderList } from '~/components/ActionHeader';
import { TableContainer, TableLoading } from '~/components/Table';
import Pagination from '~/components/Pagination';
import Action from './Action';

export default function DeliveryList() {
  const [deliverymans, setDeliverymans] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(null);
  const [search, setSearch] = useState('');
  const [totalDeliverymans, setTotalDeliverymans] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDeliverymans() {
      try {
        const response = await api.get('/deliverymans', {
          params: {
            page: currentPage,
            name: search
          }
        });

        if (!response.data) {
          toast.warn('Nenhuma encomenda cadastrada');
        }

        setPages(response.data.pages);
        setTotalDeliverymans(response.data.total);
        setDeliverymans(response.data.docs);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        toast.error(
          'Não foi possível carregar as informações dos entregadores'
        );
      }
    }

    loadDeliverymans();
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
        lowercaseTitle="entregadores"
        page="deliveryman/new"
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
                <th>Foto</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {deliverymans.map(deliveryman => (
                <tr key={deliveryman.id}>
                  <td>#{deliveryman.id}</td>
                  <td>
                    <div>
                      <img
                        src={
                          deliveryman.avatar.url ||
                          'https://api.adorable.io/avatars/40/abott@adorable.pngC'
                        }
                        alt="Avatar"
                      />
                    </div>
                  </td>
                  <td>{deliveryman.name}</td>
                  <td>{deliveryman.email}</td>
                  <Action
                    page={`deliveryman/edit/${deliveryman.id}`}
                    id={deliveryman.id}
                    deliverymans={deliverymans}
                    setDeliverymans={setDeliverymans}
                  />
                </tr>
              ))}
            </tbody>
          </TableContainer>

          <Pagination
            currentPage={currentPage}
            pages={pages}
            totalDocs={totalDeliverymans}
            handlePage={handlePage}
          />
        </>
      )}
    </>
  );
}
