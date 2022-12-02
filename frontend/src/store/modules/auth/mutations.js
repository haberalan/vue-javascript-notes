export default {
  setUser(state, payload) {
    state.username = payload.username;
    state.token = payload.token;
    state.lastUpdated = payload.lastUpdated;
  },
};
