/**
 * Extracts the title and summary from a given text.
 *
 * @format
 * @param {string} summary - The input summary containing title and summary keywords.
 * @returns {{ title: string, summary: string }} An object containing the extracted title and summary.
 */

export function extractTitleAndSummaryFromText(summary) {
  if (!summary) return { title: "", summary: "" };

  const titleMatch = summary.match(
    /(?:Titre\s*|title\s*):\s*(.+?)\n(?:Résumé|Summary):/is
  );
  const title = titleMatch ? titleMatch[1].trim() : "";

  const summaryMatch = summary.match(/(?:Résumé\s*|Summary\s*):\s*(.+)/is);
  const extractedSummary = summaryMatch ? summaryMatch[1].trim() : summary;

  return { title, summary: extractedSummary };
}

export function extractTitleAndSummaryFromJsonString(jsonString) {
  if (!jsonString) return { title: "", summary: "" };

  const jsonData = JSON.parse(jsonString);
  return jsonData;
}
/**
 * extract title and summary from the text, the text is a json string.
 * if the json extract fails then it will extract the title and summary from the text.
 * @param {*} Text
 */

export function extractTitleAndSummary(Text) {
  if (!Text) return { title: "", summary: "" };

  try {
    const jsonData = extractTitleAndSummaryFromJsonString(Text);
    return jsonData;
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return extractTitleAndSummaryFromText(Text);
  }
}
export function sortByLongestTitle(data) {
  return data.sort((a, b) => {
    const lengthA = a.titles.length;
    const lengthB = b.titles.length;
    return lengthB - lengthA;
  });
}

export function formatDateToInput(date) {
  if (!date || !(date instanceof Date)) {
    console.error("Invalid date passed to formatDateToInput:", date);
    return "";
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

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
