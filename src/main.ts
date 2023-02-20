import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@/assets/styles.scss';

import DataTable from "primevue/datatable";
import Column from "primevue/column";

import PrimeVue from 'primevue/config';





const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, { ripple: true });

app.component("DataTable", DataTable);
app.component("Column", Column);

app.mount('#app')
