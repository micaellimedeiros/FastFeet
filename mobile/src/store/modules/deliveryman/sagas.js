import { takeLatest, call, all, put } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';

import api from '~/services/api';
import { signInSuccess, signFailure, signOut } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;
    parseInt(id, 10);
    if (!id) {
      yield put(signFailure());
      return;
    }
    const { data } = yield call(api.get, `deliveryman/${id}/deliveries`);

    yield put(signInSuccess(data.deliveryman));
  } catch (err) {
    yield put(signFailure());
    showMessage({
      message: 'Falha ao realizar login',
      description: err.response
        ? err.response.data.error
        : 'Erro de conexão com o servidor',
      type: 'danger',
    });
  }
}

export function* verifyUser({ payload }) {
  if (!payload) {
    return;
  }
  const { deliveryman } = payload;
  try {
    yield call(api.get, `deliveryman/${deliveryman.profile.id}/deliveries`);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      yield put(signOut());
    }
  }
}

export default all([
  takeLatest('persist/REHYDRATE', verifyUser),
  takeLatest('@deliveryman/SIGN_IN_REQUEST', signIn),
]);
