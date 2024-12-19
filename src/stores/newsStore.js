/** @format */

import { news_sumaries } from "@/utils/constants";
import { defineStore } from "pinia";

export const useNewsStore = defineStore("news", {
    state: () => ({
        news: news_sumaries, // To store the fetched news data
        isLoading: true, // To track loading state
    }),
    actions: {
        setNews(data) {
            console.log(data, "from store");
            this.news = data;
            this.isLoading = false;
        },
    },
});
