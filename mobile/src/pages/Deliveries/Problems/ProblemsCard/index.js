import React from 'react';
import { format, parseISO } from 'date-fns';

import { Container, Problem, Date } from './styles';

export default function ProblemsCard({ problem }) {
  const formattedDate = format(parseISO(problem.created_at), 'dd/MM/yyyy');
  return (
    <Container>
      <Problem>{problem.description}</Problem>
      <Date>{formattedDate}</Date>
    </Container>
  );
}
