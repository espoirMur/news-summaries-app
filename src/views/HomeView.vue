<script setup>
import Header from '@/components/Header.vue';
import Hero from '@/components/Hero.vue';
import NewTile from '@/components/NewTile.vue';
import { useQuery } from '@tanstack/vue-query';

const fetcher = async () => {
  const data = await fetch(`https://news-proxy.netlify.app/api/top-headlines?pageSize=12&page=1&apiKey=dc6c52bcb7734ed59ed9898541938a6d&language=en`).then((res) => res.json());
  return data?.articles?.filter(article => article.source.id !== null);
}
const { data, isLoading } = useQuery({
  queryKey: ["news"],
  queryFn: () => fetcher()
})

</script>

<template>
  <Header />
  <div v-if="isLoading" class="min-h-svh w-full flex justify-center items-center">
    <span class="loading loading-spinner loading-md"></span>
  </div>
  <main v-else-if="data" class="max-w-7xl mx-auto px-6 lg:px-8 font-montserrat flex flex-col gap-8">
    <Hero :title="data[0]?.title" :description="data[0]?.description" :img-url="data[0]?.urlToImage"
      :href="data[0]?.url" />
    <div class="flex justify-normal lg:justify-end">
      <select className="select select-bordered w-full max-w-xs">
        <option disabled selected>Filter articles</option>
        <option>Tous</option>
        <option>Aujourdhui</option>
        <option>Cette Semaine</option>
        <option>Ce Moi</option>
      </select>
    </div>
    <div class="flex flex-col gap-4">
      <NewTile v-for="article in data" :key="article?.source?.id" :title="article.title"
        :description="article.description" :published="article.publishedAt" :href="article.url" />
    </div>
  </main>
  <footer class="w-full py-4 lg:py-6">
    <div class="max-w-7xl mx-auto px-6 lg:px-8 font-montserrat flex justify-end ">
      <span class="text-base font-normal"> &copy; 2024</span>
    </div>
  </footer>
</template>
