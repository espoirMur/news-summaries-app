/** @format */

import { news_sumaries } from "@/utils/constants";
import { defineStore } from "pinia";

export const useNewsStore = defineStore("news", {
    state: () => ({
        news: news_sumaries, // To store the fetched news data
        isLoading: true, // To track loading state
        news_detail: JSON.parse(localStorage.getItem("news_detail")) || null, // Initialize from localStorage
    }),
    actions: {
        setNews(data) {
            console.log(data, "from store");
            this.news = data;
            this.isLoading = false;
        },
        setNewsDetail(detail) {
            this.news_detail = detail;
            localStorage.setItem("news_detail", JSON.stringify(detail)); // Persist to localStorage
        },
        loadNewsDetailFromStorage() {
            const storedDetail = localStorage.getItem("news_detail");
            if (storedDetail) {
                this.news_detail = JSON.parse(storedDetail);
            }
        },
    },
});
