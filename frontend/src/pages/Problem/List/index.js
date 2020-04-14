import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { HeaderList } from '~/components/ActionHeader';
import { TableContainer, TableLoading } from '~/components/Table';
import Action from './Action';
import Details from './Details';
import Pagination from '~/components/Pagination';

export default function ProblemList() {
  const [problems, setProblems] = useState([]);
  const [problemDetail, setProblemDetail] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(null);
  const [totalProblems, setTotalProblems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    async function loadProblems() {
      try {
        const response = await api.get('/problems', {
          params: {
            page: currentPage
          }
        });
        if (!response.data) {
          toast.warn('Nenhum problema cadastrado');
        }

        setPages(response.data.pages);
        setTotalProblems(response.data.length);
        setProblems(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        toast.error('Não foi possível carregar as informações dos problemas');
      }
    }

    loadProblems();
  }, [currentPage]);

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

  function handleDetails(problem) {
    setProblemDetail(problem);
    handleVisible();
  }

  return (
    <>
      <HeaderList
        lowercaseTitle="problemas"
        page="problem/new"
        visible={false}
      />

      {loading ? (
        <TableLoading />
      ) : (
        <>
          <TableContainer>
            <thead>
              <tr>
                <th>ID</th>
                <th>ID da encomenda</th>
                <th>Problema</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {problems.map(problem => (
                <tr key={problem.id}>
                  <td>#{problem.id}</td>
                  <td>#{problem.delivery.id}</td>
                  <td>{problem.description}</td>
                  <Action
                    handleDetails={() => handleDetails(problem)}
                    id={problem.id}
                    problem={problemDetail}
                  />
                </tr>
              ))}
            </tbody>
          </TableContainer>

          <Details
            visible={visible}
            problem={problemDetail}
            handleVisible={handleVisible}
          />

          <Pagination
            currentPage={currentPage}
            pages={pages}
            totalDocs={totalProblems}
            handlePage={handlePage}
          />
        </>
      )}
    </>
  );
}
