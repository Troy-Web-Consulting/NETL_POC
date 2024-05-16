import './styles.css';
import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import App from './app/App.vue';
import 'primevue/resources/themes/aura-light-green/theme.css';
import Button from "primevue/button";
import "vue3-openlayers/styles.css";

import OpenLayersMap from "vue3-openlayers";
import { Map, Layers, Sources, Geometries } from "vue3-openlayers";

const app = createApp(App);

app.use(PrimeVue);
app.component('KButton', Button);
app.use(OpenLayersMap /*, options */);
app.use(Map /*, options */);
app.use(Layers /*, options */);
app.use(Sources /*, options */);
app.use(Geometries /*, options */);

app.mount('#root');
