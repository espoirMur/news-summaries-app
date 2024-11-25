/** @format */

import { news_sumaries } from "@/utils/constants";

export const fetchNews = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return news_sumaries;
};

export const fetchOneNews = async (index = 0) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const singleNews = news_sumaries[index];
    return singleNews;
};

export const fetcher = async () => {
    const data = await fetch(
        `https://news-proxy.netlify.app/api/top-headlines?pageSize=12&page=1&apiKey=dc6c52bcb7734ed59ed9898541938a6d&language=en`
    ).then((res) => res.json());
    return data?.articles?.filter((article) => article.source.id !== null);
};
