import { createApp } from 'vue';
import { Button, ConfigProvider } from 'ant-design-vue';

import App from './App.vue';
import router from './router';
import store from './store';
import apis from './library/apis';

window.apis = apis;
const app = createApp(App);

app.use(Button);
app.use(ConfigProvider);

app.use(store).use(router).mount('#app');
