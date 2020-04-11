import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import logo from '../../../assets/logo.png';

import Background from '~/components/Background/BackgroundSignIn';
import { signInRequest } from '~/store/modules/auth/actions';

import { Container, Form, FormInput, ErrorLabel, SubmitButton } from './styles';

export default function SignIn() {
  const [id, setId] = useState('');
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const loading = useSelector(store => store.auth.loading);

  function handleSubmit() {
    if (!id) setError(true);
    else dispatch(signInRequest(id));
  }

  useEffect(() => {
    setError(false);
  }, [id]);

  return (
    <Background>
      <Container>
        <Image source={logo} />
        <Form>
          <FormInput
            autoCorrect={false}
            keyboardType="numeric"
            placeholder="Informe seu ID de cadastro"
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={id}
            onChangeText={setId}
          />
          {error && <ErrorLabel>Campo obrigatório</ErrorLabel>}
          <SubmitButton loading={loading} onPress={handleSubmit}>
            Entrar no sistema
          </SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}
