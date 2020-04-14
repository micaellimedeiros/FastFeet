import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';

import api from '~/services/api';

import { HeaderList } from '~/components/ActionHeader';
import { TableContainer, TableLoading } from '~/components/Table';
import Details from './Details';
import Action from './Action';
import Pagination from '~/components/Pagination';

import { Status } from './styles';

export default function DeliveryList() {
  const [deliveries, setDeliveries] = useState([]);
  const [deliveryDetail, setDeliveryDetail] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(null);
  const [search, setSearch] = useState('');
  const [totalDeliveries, setTotalDeliveries] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  const getFormattedStatus = delivery => {
    let status = {};

    if (delivery.canceled_at) {
      status = { text: 'CANCELADA', background: '#FAB0B0', color: '#DE3B3B' };
      return status;
    }

    if (delivery.end_date) {
      status = { text: 'ENTREGUE', background: '#DFF0DF', color: '#2CA42B' };
      return status;
    }

    if (delivery.start_date) {
      status = { text: 'RETIRADA', background: '#BAD2FF', color: '#4D85EE' };
      return status;
    }

    status = { text: 'PENDENTE', background: '#F0F0DF', color: '#C1BC35' };

    return status;
  };

  useEffect(() => {
    async function loadDeliveries() {
      try {
        const response = await api.get('/deliveries', {
          params: {
            page: currentPage,
            q: search
          }
        });

        const data = response.data.items.map(delivery => {
          return {
            ...delivery,
            formattedStatus: getFormattedStatus(delivery),
            street_number: `${delivery.recipient.street}, ${delivery.recipient.number}`,
            city_state: `${delivery.recipient.city} - ${delivery.recipient.state}`,
            start_date_formatted: delivery.start_date
              ? format(parseISO(delivery.start_date), 'dd/MM/yyyy')
              : null,
            end_date_formatted: delivery.end_date
              ? format(parseISO(delivery.end_date), 'dd/MM/yyyy')
              : null
          };
        });

        if (!response.data) {
          toast.warn('Nenhuma encomenda cadastrada');
        }

        setPages(response.data.pages);
        setTotalDeliveries(response.data.total);
        setDeliveries(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        toast.error('Não foi possível carregar as informações das encomendas');
      }
    }

    loadDeliveries();
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

  function handleVisible() {
    setVisible(!visible);
  }

  function handleDetails(delivery) {
    setDeliveryDetail(delivery);
    handleVisible();
  }

  return (
    <>
      <HeaderList
        lowercaseTitle="encomendas"
        page="delivery/new"
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
                <th>Destinatário</th>
                <th>Entregador</th>
                <th>Cidade</th>
                <th>Estado</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {deliveries.map(
                ({ deliveryman, recipient, status, ...delivery }) => (
                  <tr key={delivery.id}>
                    <td>#{delivery.id}</td>
                    <td>{recipient.name}</td>
                    <td>
                      <div>
                        <img
                          src={
                            deliveryman.avatar.url ||
                            'https://api.adorable.io/avatars/40/abott@adorable.pngC'
                          }
                          alt="Avatar"
                        />
                        {deliveryman.name}
                      </div>
                    </td>
                    <td>{recipient.city}</td>
                    <td>{recipient.state}</td>
                    <Status status={delivery.formattedStatus}>
                      <span>{delivery.formattedStatus.text}</span>
                    </Status>
                    <Action
                      page={`delivery/edit/${delivery.id}`}
                      handleDetails={() => handleDetails(delivery)}
                      id={delivery.id}
                      delivery={deliveryDetail}
                    />
                  </tr>
                )
              )}
            </tbody>
          </TableContainer>

          <Details
            visible={visible}
            delivery={deliveryDetail}
            handleVisible={handleVisible}
          />

          <Pagination
            currentPage={currentPage}
            pages={pages}
            totalDocs={totalDeliveries}
            handlePage={handlePage}
          />
        </>
      )}
    </>
  );
}
