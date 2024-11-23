<script setup>
import Header from '@/components/Header.vue';
import Hero from '@/components/Hero.vue';
import { useQuery } from '@tanstack/vue-query';

const fetcher = async () => await fetch(`https://news-proxy.netlify.app/api/top-headlines?pageSize=12&page=1&apiKey=dc6c52bcb7734ed59ed9898541938a6d&language=en`).then(
  (response) => response.json(),
)
const { data, isLoading } = useQuery({
  queryKey: ["news"],
  queryFn: () => fetcher()
})

</script>

<template>
  <Header />
  <div v-if="isLoading" class="min-h-[60svh] w-full flex justify-center items-center">
    <span class="loading loading-spinner loading-md"></span>
  </div>
  <main v-else-if="data" class="max-w-7xl mx-auto px-6 lg:px-8 font-montserrat">
    <Hero :title="data?.articles[0]?.title" :description="data?.articles[0]?.description"
      :img-url="data?.articles[0]?.urlToImage" :href="data?.articles[0]?.url" />
  </main>
</template>
