import React from 'react';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import { Container, Header, HeaderTitle, Label, Text } from './styles';

export default function DetailsCard({ recipient, product }) {
  return (
    <Container>
      <Header>
        <Icon name="truck" color="#7D40E7" size={27} />
        <HeaderTitle>Informações da entrega</HeaderTitle>
      </Header>
      <Label>Destinatário</Label>
      <Text>{recipient?.name}</Text>
      <Label>Endereço de entrega</Label>
      <Text>
        {recipient?.street}, {recipient?.number}, {recipient?.city} -{' '}
        {recipient?.state}, {recipient?.cep}
      </Text>
      <Label>Produto</Label>
      <Text>{product}</Text>
    </Container>
  );
}
