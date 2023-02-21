import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@/assets/styles.scss';

import ToastService from "primevue/toastservice";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Dialog from "primevue/dialog";
import FileUpload from "primevue/fileupload";
import Toast from "primevue/toast";

import PrimeVue from 'primevue/config';





const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, { ripple: true });
app.use(ToastService);


app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("Toolbar", Toolbar);
app.component("Button", Button);
app.component("InputText", InputText);
app.component("Textarea", Textarea);
app.component("Dialog", Dialog);
app.component("FileUpload", FileUpload);
app.component("Toast", Toast);

app.mount('#app')
