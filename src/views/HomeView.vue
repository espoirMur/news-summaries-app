<script setup>
import { getData } from "@/api/fetcher";
import NewTile from "@/components/NewTile.vue";
import { extractTitleAndSummary } from "@/utils/funct";
import { useQuery } from "@tanstack/vue-query";
import VueDatePicker from "@vuepic/vue-datepicker";
import { ref, computed, watch } from "vue";

const selectedDate = ref(null);

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

const articlesWithTitles = computed(() => {
  if (!data.value) return [];
  return data.value.map((article) => {
    const summary = article.summary;
    const { title: extractedTitle, summary: extractedSummary } = extractTitleAndSummary(summary);

    // Fallback to the first title in the titles array if extractedTitle is empty
    const title = extractedTitle || article.titles[0] || ""; // Ensure there's always a string
    const updatedSummary = extractedSummary || summary; // Fallback to original summary if empty

    return {
      ...article,
      title,
      summary: updatedSummary,
    };
  });
});


</script>

<template>
  <div v-if="isLoading" class="min-h-svh w-full mt-8 flex justify-center items-center">
    <span class="loading loading-spinner loading-md"></span>
  </div>
  <main v-else-if="data" class="max-w-5xl mx-auto px-6 lg:px-8 font-montserrat flex flex-col gap-8">
    <div class="flex justify-end">
      <div>
        <label for="">Trier par date</label>
        <VueDatePicker class="text-gray-500" v-model="selectedDate"></VueDatePicker>
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <NewTile v-for="(article, index) in articlesWithTitles" :key="index" :data="data[index]" :title="article.title"
        :description="article.summary" :published="article.publishedAt" :id="index" />
    </div>
  </main>
</template>
