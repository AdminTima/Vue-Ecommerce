import { createApp } from 'vue';
import App from './App.vue';
import { router } from "./router";
import { createPinia } from "pinia/dist/pinia";
import "./styles/main.css";
import components from "./components/UI";


const app = createApp(App);

for(const comp of components) {
    console.log(comp);
    app.component(comp.__name, comp);
}

app.use(router);
app.use(createPinia());

app.mount('#app');
