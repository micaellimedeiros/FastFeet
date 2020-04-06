export function signInRequest(id) {
  return {
    type: '@deliveryman/SIGN_IN_REQUEST',
    payload: { id },
  };
}

export function signInSuccess(deliveryman) {
  return {
    type: '@deliveryman/SIGN_IN_SUCCESS',
    payload: { deliveryman },
  };
}

export function signFailure() {
  return {
    type: '@deliveryman/SIGN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@deliveryman/SIGN_OUT',
  };
}
