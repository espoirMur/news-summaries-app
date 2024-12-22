<script setup>
import { getData } from "@/api/fetcher";
import NewTile from "@/components/NewTile.vue";
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
    let title = article.titles[0];
    let updatedSummary = summary;

    const titleMatch = summary.match(/Titre:\s*(.+?)\nRésumé:/s);
    const summaryMatch = summary.match(/Résumé:\s*(.+)/s);

    if (titleMatch) {
      title = titleMatch[1].trim();
    }
    if (summaryMatch) {
      updatedSummary = summaryMatch[1].trim();
    }

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
      <NewTile v-for="(article, index) in articlesWithTitles" :key="index" :data="article" :title="article.title"
        :description="article.summary" :published="article.publishedAt" :id="index" />
    </div>
  </main>
</template>
