<script setup>
import { fetchNews } from '@/api/fetcher';
import NewTile from '@/components/NewTile.vue';
import { useQuery } from '@tanstack/vue-query';
const { data, isLoading } = useQuery({
  queryKey: ["news"],
  queryFn: () => fetchNews()
})

</script>

<template>
  <div v-if="isLoading" class="min-h-svh w-full mt-8 flex justify-center items-center">
    <span class="loading loading-spinner loading-md"></span>
  </div>
  <main v-else-if="data" class="max-w-7xl mx-auto px-6 lg:px-8 font-montserrat flex flex-col gap-8">
    <div class="flex justify-end">
      <select class="select select-bordered w-full max-w-xs">
        <option disabled selected>Trier par Date</option>
        <option>Aujourdhui</option>
        <option>Semaine passée</option>
        <option>Mois Passé</option>
      </select>
    </div>
    <div class="flex flex-col gap-4">
      <NewTile v-for="(article, index) in data" :key="index + 1" :description="article.summary"
        :published="article.publishedAt" :id="index + 1" />
    </div>

  </main>

</template>
