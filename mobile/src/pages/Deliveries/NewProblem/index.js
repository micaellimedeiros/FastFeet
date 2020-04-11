import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';

import api from '~/services/api';

import Background from '~/components/Background';

import {
  Container,
  HeaderBackground,
  ProblemTextArea,
  SubmitButton,
} from './styles';

export default function NewProblem({ route }) {
  const [problem, setProblem] = useState('');
  const { id } = route.params;
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      await api.post(`/delivery/${id}/problems`, { description: problem });

      showMessage({
        message: 'Problema informado',
        description: 'Aguarde contato da equipe.',
        type: 'info',
      });

      setProblem('');

      navigation.navigate('Details');
    } catch (err) {
      showMessage({
        message: 'Falha ao criar o pedido',
        description: err.response
          ? err.response.data.error
          : 'Erro de conexão com o servidor',
        type: 'danger',
      });
    }
  };

  return (
    <Background>
      <Container>
        <HeaderBackground />
        <ProblemTextArea
          autoCapitalize="none"
          underlineColorAndroid="transparent"
          placeholder="Inclua aqui o problema que ocorreu na entrega."
          autoCorrect={false}
          multiline
          numberOfLines={8}
          returnKeyType="send"
          value={problem}
          onChangeText={setProblem}
          onSubmitEditing={handleSubmit}
        />
        <SubmitButton onPress={handleSubmit}>Enviar</SubmitButton>
      </Container>
    </Background>
  );
}
