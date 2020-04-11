import React from 'react';

import Background from '~/components/Background';
import DetailsCard from './DetailsCard';
import StatusCard from './StatusCard';
import ActionsCard from './ActionsCard';

import { Container, HeaderBackground } from './styles';

export default function Details({ route }) {
  const { delivery } = route.params;
  return (
    <Background>
      <Container>
        <HeaderBackground />
        <DetailsCard
          recipient={delivery.recipient}
          product={delivery.product}
        />
        <StatusCard delivery={delivery} />
        <ActionsCard delivery={delivery} />
      </Container>
    </Background>
  );
}
