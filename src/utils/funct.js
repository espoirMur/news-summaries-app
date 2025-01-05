/**
 * Extracts the title and summary from a given text.
 *
 * @format
 * @param {string} summary - The input summary containing title and summary keywords.
 * @returns {{ title: string, summary: string }} An object containing the extracted title and summary.
 */

export function extractTitleAndSummary(summary) {
  if (!summary) return { title: "", summary: "" };

  const titleMatch = summary.match(
    /(?:Titre|title):\s*(.+?)\n(?:Résumé|Summary):/is
  );
  const title = titleMatch ? titleMatch[1].trim() : "";

  const summaryMatch = summary.match(/(?:Résumé|Summary):\s*(.+)/is);
  const extractedSummary = summaryMatch ? summaryMatch[1].trim() : summary;

  return { title, summary: extractedSummary };
}

export function sortByLongestTitle(data) {
  return data.sort((a, b) => {
    const lengthA = a.titles[0].length;
    const lengthB = b.titles[0].length;
    return lengthB - lengthA;
  });
}

export const formatDateToInput = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export function formatDateTimeToFrench(dateString) {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date");
  }

  const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedDate = dateFormatter.format(date);

  return `${formattedDate}`;
}
