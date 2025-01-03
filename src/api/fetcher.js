/** @format */

export const fetchOneNews = async (index = 0, news_sumaries) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const singleNews = news_sumaries[index];
    return singleNews;
};

export const getData = async (date = null) => {
    const baseUrl =
        "https://congo-news-summaries.s3.us-west-004.backblazeb2.com/summaries/";
    const url = `${baseUrl}news-summaries-${date}.json`;

    try {
        const response = await fetch(url);
        if (response.status === 404) {
            // Return a specific message for 404
            return {
                error: true,
                message:
                    "Aucune nouvelle n'a été générée pour aujourd'hui. Veuillez essayer la date précédente ou une autre date.",
            };
        }
        if (!response.ok) {
            throw new Error("An error occurred while fetching the news");
        }
        return await response.json();
    } catch (error) {
        console.error(`Failed to fetch data for ${date}:`, error);
        throw new Error(
            "Une erreur s'est produite lors de la récupération des données."
        );
    }
};
