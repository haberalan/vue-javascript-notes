import { createStore } from 'vuex';

import authModule from './modules/auth/index';
import notesModule from './modules/notes/index';

const store = createStore({
  modules: {
    auth: authModule,
    notes: notesModule,
  },
});

export default store;
