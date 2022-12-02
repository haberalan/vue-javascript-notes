// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

// Vuetify
import { createVuetify } from 'vuetify';

const light = {
  dark: false,
  colors: {
    app1: '#3d405b',
    background: '#e7ecef',
  },
};

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light,
    },
  },
});
