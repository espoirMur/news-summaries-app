<script setup>
import { fetchNews } from '@/api/fetcher';
import Header from '@/components/Header.vue';
import Hero from '@/components/Hero.vue';
import NewTile from '@/components/NewTile.vue';
import { useQuery } from '@tanstack/vue-query';
import { ref, computed } from 'vue';

const currentPage = ref(1);
const itemsPerPage = 5;

const { data, isLoading } = useQuery({
  queryKey: ["news"],
  queryFn: () => fetchNews()
})

const paginatedData = computed(() => {
  if (!data?.value) return [];
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return data.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil((data?.value?.length || 0) / itemsPerPage));
const goToPage = (page) => {
  if (page > 0 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

</script>

<template>

  <div v-if="isLoading" class="min-h-svh w-full flex justify-center items-center">
    <span class="loading loading-spinner loading-md"></span>
  </div>
  <main v-else-if="data" class="max-w-7xl mx-auto px-6 lg:px-8 font-montserrat flex flex-col gap-8">
    <Hero :description="data[0]?.summary" :id="1" />
    <div class="flex lg:justify-end justify-normal">
      <div class="flex justify-center items-center gap-4 mt-6">
        <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
          class="px-6 py-1 text-xs font-medium rounded-lg bg-gray-200 text-gray-900 hover:bg-gray-500 hover:text-gray-200 disabled:bg-gray-100 disabled:cursor-not-allowed">
          <span class="text-lg">&lsaquo;&lsaquo;</span> Previous
        </button>
        <span class="text-sm">Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages"
          class="px-6 py-1 text-xs font-medium rounded-lg bg-gray-200 text-gray-900 hover:bg-gray-500 hover:text-gray-200 disabled:bg-gray-100 disabled:cursor-not-allowed">
          Next <span class="text-lg">&rsaquo;&rsaquo;</span>
        </button>
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <NewTile v-for="(article, index) in paginatedData" :key="index + 1" :description="article.summary"
        :published="article.publishedAt" :id="index + 1" />
    </div>

  </main>

</template>
