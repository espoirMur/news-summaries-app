<script setup>
import { fetchNews } from '@/api/fetcher';
import NewTile from '@/components/NewTile.vue';
import { useQuery } from '@tanstack/vue-query';
import VueDatePicker from '@vuepic/vue-datepicker';
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
      <div>
        <label for="">Trier par date</label>
        <VueDatePicker class="text-gray-500" v-model="date"></VueDatePicker>
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <NewTile v-for="(article, index) in data" :key="index + 1" :description="article.summary"
        :published="article.publishedAt" :id="index + 1" />
    </div>
  </main>
</template>
