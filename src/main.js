/** @format */

import "./assets/main.css";
import "@vuepic/vue-datepicker/dist/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { createPinia } from "pinia";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(VueQueryPlugin);

app.use(pinia);
app.mount("#app");
