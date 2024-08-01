import _ from 'lodash';
import { RootState } from '@redux/store';

function getUserInfo() {
  return (state: RootState) => {
    return { user: state.user.user };
  };
}

export default {
  getUserInfo,
};
