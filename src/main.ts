import './styles.css';

import { createApp } from 'vue';

import App from './app/App.vue';
import router from './router';

import OpenLayersMap from "vue3-openlayers";
const app = createApp(App);

app.use(router); // Use router
app.use(OpenLayersMap /*, options */);

app.mount('#root');
