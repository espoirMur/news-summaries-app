<script setup>
import { getData } from "@/api/fetcher";
import NewTile from "@/components/NewTile.vue";
import { extractTitleAndSummary, formatDateTimeToFrench, sortByLongestTitle } from "@/utils/funct";
import { useQuery } from "@tanstack/vue-query";
import VueDatePicker from "@vuepic/vue-datepicker";
import { ref, computed, watch } from "vue";

const today = new Date();

const startDate = new Date("2024-12-15");

const selectedDate = ref(today);

const formattedDate = computed(() => {
  if (!selectedDate.value) return null;
  const year = selectedDate.value.getFullYear();
  const month = String(selectedDate.value.getMonth() + 1).padStart(2, "0");
  const day = String(selectedDate.value.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
});

const { data, isLoading, refetch } = useQuery({
  queryKey: ["news", formattedDate],
  queryFn: () => getData(formattedDate.value),
  enabled: true, // Query will run automatically
});

watch(formattedDate, () => {
  refetch();
});


const sortedArticles = computed(() => {
  if (!data.value) return [];
  const articlesWithTitles = data.value.map((article) => {
    const summary = article.summary || "";
    const { title: extractedTitle, summary: extractedSummary } = extractTitleAndSummary(summary);

    const title = extractedTitle || article.titles?.[0] || "Untitled"; // Handle fallback for missing titles
    const updatedSummary = extractedSummary || summary; // Fallback to original summary if empty

    return {
      ...article,
      title,
      summary: updatedSummary,
    };
  });

  return sortByLongestTitle(articlesWithTitles);
});


const isDateDisabled = (date) => {
  return date < startDate || date > today;
};

</script>

<template>
  <div v-if="isLoading" class="min-h-svh w-full mt-8 flex justify-center items-center">
    <span class="loading loading-spinner loading-md"></span>
  </div>
  <main v-else-if="data" class="max-w-5xl mx-auto px-6 lg:px-8 font-montserrat flex flex-col gap-8">
    <div class="flex flex-col gap-2">
      <h1 class="text-2xl lg:text-3xl font-extrabold">
        Resumes des nouvelles de la RDC en la date du {{ formatDateTimeToFrench(formattedDate) }}
      </h1>
      <p class="text-sm italic max-w-3xl">Le resume es generé par une Intelligence Artificiel et peut contenir des
        erreurs,
        referez vous aux articles
        en
        details pour des
        nouvelles correct. Cliquer sur <span class="font-semibold">En savoir plus</span>.
      </p>
    </div>
    <div class="flex justify-end">
      <div>
        <label for="">Trier par date</label>
        <VueDatePicker class="text-gray-500" id="date-picker" v-model="selectedDate" :disabled-dates="isDateDisabled"
          :default-date="today" :highlighted-dates="[today]" format="yyyy-MM-dd" />
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <NewTile v-for="(article, index) in sortedArticles" :key="index" :data="data[index]" :title="article.title"
        :description="article.summary" :published="article.publishedAt" :id="index" />
    </div>
  </main>
</template>
