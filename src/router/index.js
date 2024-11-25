/** @format */

import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NewsDetail from "@/views/NewsDetail.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/info/:id",
            name: "info",
            component: NewsDetail,
        },
    ],
});

export default router;
