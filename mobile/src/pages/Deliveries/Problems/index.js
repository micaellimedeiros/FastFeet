import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import Background from '~/components/Background';
import ProblemsCard from './ProblemsCard';

import api from '~/services/api';

import { Container, HeaderBackground, Title, ProblemsList } from './styles';

export default function Problems({ route }) {
  const [problems, setProblems] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { id } = route.params;

  const loadProblems = async () => {
    try {
      const { data } = await api.get(`delivery/${id}/problems`, {
        params: { page },
      });

      setProblems(data);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProblems();
  }, []); // eslint-disable-line

  return (
    <Background>
      <Container>
        <HeaderBackground />
        <Title>Encomenda {problems[0]?.delivery?.id}</Title>
        {loading && page === 1 ? (
          <ActivityIndicator color="#ee4e62" size={30} />
        ) : (
          <>
            {!problems.length ? (
              <Title>Nenhum problema encontrado</Title>
            ) : (
              <ProblemsList
                data={problems}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => <ProblemsCard problem={item} />}
              />
            )}
          </>
        )}
        {loading && page !== 1 && (
          <ActivityIndicator color="#ee4e62" size={30} />
        )}
      </Container>
    </Background>
  );
}
