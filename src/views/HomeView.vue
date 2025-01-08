<script setup>
import { getData } from "@/api/fetcher";
import NewTile from "@/components/NewTile.vue";
import {
  extractTitleAndSummary,
  formatDateTimeToFrench,
  formatDateToInput,
  sortByLongestTitle,
} from "@/utils/funct";
import { useQuery } from "@tanstack/vue-query";
import { ref, computed, watch } from "vue";
import Oops from "../assets/oops.png";

const today = new Date();
const yesterday = new Date();
yesterday.setDate(today.getDate() - 1);

const startDate = new Date("2024-12-15");

const selectedDate = ref(yesterday);

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
  enabled: true,
});

watch(formattedDate, () => {
  refetch();
});

const sortedArticles = computed(() => {
  if (!data.value) return [];
  const articlesWithTitles = data.value.map((article) => {
    const summary = article.summary || "";
    const { title: extractedTitle, summary: extractedSummary } =
      extractTitleAndSummary(summary);

    const title = extractedTitle || article.titles?.[0] || "Untitled";
    const updatedSummary = extractedSummary || summary;

    return {
      ...article,
      title,
      summary: updatedSummary,
    };
  });

  return sortByLongestTitle(articlesWithTitles);
});

const handleDateChange = (event) => {
  const date = new Date(event.target.value);
  if (!isNaN(date.getTime())) {
    selectedDate.value = date;
    refetch();
  } else {
    console.error("Invalid date:", event.target.value);
    event.target.value = formattedDate.value;
  }
};
</script>

<template>
  <div
    class="max-w-5xl mx-auto px-6 lg:px-8 font-montserrat flex flex-col gap-8"
  >
    <!-- Introductory Text and Date Picker -->
    <div class="flex flex-col gap-2">
      <h1 class="text-2xl lg:text-3xl font-extrabold">
        Resumes des nouvelles de la RDC en la date du
        {{ formatDateTimeToFrench(formattedDate) }}
      </h1>
      <p class="text-sm italic max-w-3xl">
      <span> Les résumés sont générés par une intelligence artificielle et peuvent contenir des erreurs. Veuillez prendre soin de lire les articles dans la section <b>En savoir plus </b> chaque categorie pour obtenir des informations correctes.</span>.
      </p>
    </div>
    <div class="flex md:justify-end justify-normal">
      <div>
        <label class="font-bold" for="date-picker"
          >Selectionner une date 📆</label
        >
        <input
          id="date-picker"
          :value="formattedDate"
          @change="handleDateChange"
          type="date"
          :min="formatDateToInput(startDate)"
          :max="formatDateToInput(today)"
          class="input input-bordered w-full max-w-xs mt-2"
        />
      </div>
    </div>

    <!-- Loading Spinner -->
    <div
      v-if="isLoading"
      class="min-h-svh w-full mt-8 flex justify-center items-center"
    >
      <span class="loading loading-spinner loading-md"></span>
    </div>

    <!-- Error Message -->
    <div
      v-else-if="data?.error"
      class="text-center h-[60svh] flex items-center"
    >
      <div class="flex flex-col gap-6 items-center w-full">
        <h1 class="font-semibold text-lg max-w-2xl">{{ data.message }}</h1>
        <div class="w-[300px] h-[300px]">
          <img class="w-full h-full object-contain" :src="Oops" alt="error" />
        </div>
      </div>
    </div>

    <!-- News Articles -->
    <div v-else class="flex flex-col gap-4">
      <NewTile
        v-for="(article, index) in sortedArticles"
        :key="index"
        :data="article"
        :title="article.title"
        :description="article.summary"
        :published="article.publishedAt"
        :id="index"
      />
    </div>
  </div>
</template>
