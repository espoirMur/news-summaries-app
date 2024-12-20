/** @format */

export const fetchOneNews = async (index = 0, news_sumaries) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const singleNews = news_sumaries[index];
    return singleNews;
};

export const fetcher = async (date = null) => {
    const baseUrl =
        "https://congo-news-summaries.s3.us-west-004.backblazeb2.com/summaries/";
    const url = date
        ? `${baseUrl}news-summaries-${date}.json`
        : `${baseUrl}test.json`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("File not found, falling back to default");
        }
        return await response.json();
    } catch (error) {
        if (date) {
            console.warn(
                `Date file not found: ${url}, falling back to test.json`
            );
            const fallbackResponse = await fetch(`${baseUrl}test.json`);
            if (!fallbackResponse.ok) {
                throw new Error("Fallback failed");
            }
            return await fallbackResponse.json();
        }
        throw error;
    }
};
