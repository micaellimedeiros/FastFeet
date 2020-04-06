import { all } from 'redux-saga/effects';

import deliveryman from './deliveryman/sagas';

export default function* rootSaga() {
  return yield all([deliveryman]);
}
