import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';

import {
  MaterialIcons as Icon,
  MaterialCommunityIcons as Icon2,
} from '@expo/vector-icons';

import api from '~/services/api';

import { Container, Left, Label, Center, Right } from './styles';

export default function ActionsCard({ delivery }) {
  const profile = useSelector(state => state.deliveryman.profile);
  const navigation = useNavigation();

  const handleAddProblem = async () => {
    if (delivery.end_date) return;

    navigation.navigate('NewProblem', { id: delivery.id });
  };

  const handleConfirm = async () => {
    if (delivery.end_date) return;

    if (delivery.start_date) {
      navigation.navigate('Confirm', { id: delivery.id });
      return;
    }

    try {
      await api.put(`deliverymans/${profile.id}/deliveries/${delivery.id}`, {
        start_date: new Date(),
      });

      showMessage({
        message: 'Encomenda retirada com sucesso',
        description: 'Entre em contato se tiver algum problema',
        type: 'info',
      });

      navigation.navigate('Deliveries');
    } catch (err) {
      showMessage({
        message: 'Falha ao retirar mercadoria',
        description: err.response
          ? err.response.data.error
          : 'Erro de conexão com o servidor',
        type: 'danger',
      });
    }
  };
  return (
    <Container>
      <Left onPress={() => handleAddProblem()}>
        <Icon name="highlight-off" color="#E74040" size={27} />
        <Label>Informar Problema</Label>
      </Left>
      <Center
        onPress={() => navigation.navigate('Problems', { id: delivery.id })}
      >
        <Icon name="info-outline" color="#E7BA40" size={27} />
        <Label>Visualizar Problemas</Label>
      </Center>
      <Right onPress={() => handleConfirm()}>
        <Icon2 name="check-circle-outline" color="#7D40E7" size={27} />
        <Label>
          {delivery?.end_date
            ? 'Produto Entregue'
            : delivery?.start_date
            ? 'Confirma Entrega'
            : 'Confirma Retirada'}
        </Label>
      </Right>
    </Container>
  );
}
