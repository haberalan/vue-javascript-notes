import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';

loadFonts();

const app = createApp(App);
app.use(router);
app.use(store);
app.use(vuetify);

router.isReady().then(() => {
  app.mount('#app');
});
