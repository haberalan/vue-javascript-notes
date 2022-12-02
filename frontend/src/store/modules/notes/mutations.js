export default {
  setNotes(state, payload) {
    state.items = payload.items;
  },
  addNote(state, payload) {
    state.items.push(payload.item);
  },
  updateNote(state, payload) {
    const items = state.items.filter((item) => item._id !== payload.item._id);
    items.push(payload.item);
    state.items = items;
  },
  removeNote(state, payload) {
    const items = state.items.filter((item) => item._id !== payload.item._id);
    state.items = items;
  },
};
