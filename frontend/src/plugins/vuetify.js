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

const dark = {
  dark: true,
  colors: {
    app1: '#3d405b',
    background: '#191919',
  },
};

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light,
      dark,
    },
  },
});
