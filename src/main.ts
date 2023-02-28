import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import axios from "axios";
import "element-plus/dist/index.css";

// axios.defaults.baseURL = 'http://localhost:8088'

createApp(App).use(store).use(router).use(ElementPlus).mount("#app");
