import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { singInSuccess, signFailure } from './actions';

export function* singIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password
    });

    const { token, user } = response.data;

    // if (!user.admin) {
    //   toast.error('Este usuário não é um administrador :/');
    //   return;
    // }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(singInSuccess(token, user));

    history.push('/deliveries');
  } catch (err) {
    toast.error('E-mail ou senha inválidos');
    yield put(signFailure());
  }
}

function setToken({ payload }) {
  if (!payload) {
    return;
  }

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', singIn),
  takeLatest('@auth/SIGN_OUT', signOut)
]);
