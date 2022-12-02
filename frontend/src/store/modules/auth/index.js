import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export default {
  state() {
    return {
      username: null,
      token: null,
      lastUpdated: null,
    };
  },
  actions,
  getters,
  mutations,
};
