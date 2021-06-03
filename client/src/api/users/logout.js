import store from 'src/store';
import { unsetUser } from 'src/store/action-creators/user';
import { setJwtToken } from './jwt';

function logout() {
  store.dispatch(unsetUser());
  setJwtToken(null);
}

export default logout;
