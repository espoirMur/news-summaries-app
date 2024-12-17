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
        `https://congo-news-summaries.s3.us-west-004.backblazeb2.com/summaries/news-summaries-2024-12-10.json`
    ).then((res) => res.json());
    return data;
};
