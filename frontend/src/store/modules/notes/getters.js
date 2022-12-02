export default {
  notes(state) {
    return state.items;
  },
  note: (state) => (id) => {
    return state.items.find((note) => note._id === id);
  },
};
