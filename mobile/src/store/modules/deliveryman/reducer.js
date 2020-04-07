import produce from 'immer';

const INITIAL_STATE = {
  profile: null,
  signed: false,
  loading: false,
};

export default function deliveryman(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@deliveryman/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@deliveryman/SIGN_IN_SUCCESS': {
        draft.profile = action.payload.deliveryman;
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case '@deliveryman/SIGN_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@deliveryman/SIGN_OUT': {
        draft.signed = false;
        draft.profile = null;
        break;
      }
      default:
    }
  });
}
