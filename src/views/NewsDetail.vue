<script setup>
// import { fetcher } from '@/api/fetcher';
// import { useQuery } from '@tanstack/vue-query';
import { RouterLink } from 'vue-router';
import { useRoute } from 'vue-router';
const router = useRoute()
const id = router.params.id
import { useNewsStore } from "@/stores/newsStore";
import { computed, ref } from 'vue';

const LoadingSummaries = ref(false)

const newsStore = useNewsStore();

// const news = computed(() => newsStore.news);
console.log(newsStore.news)

const parseId = parseInt(id)

</script>
<template>
    <main class="max-w-7xl mx-auto px-6 lg:px-8 mt-8  min-h-[80svh] font-montserrat">
        <div v-if="LoadingSummaries" class="w-full flex min-h-[50svh] justify-center items-center">
            <span class="loading loading-spinner loading-md"></span>
        </div>
        <div v-else-if="newsStore.news" class="grid grid-cols-1 gap-8">
            <div class="flex flex-col items-start">
                <RouterLink to="/"
                    class="flex items-center flex-row text-sm px-6 py-2 rounded-md text-gray-200 bg-gray-700 hover:bg-gray-800">
                    Retour
                    en
                    arrieure
                </RouterLink>
            </div>
            <div class="flex flex-col gap-4 lg:gap-6 col-span-1 ">
                <h3 class="text-2xl md:text-3xl font-bold">Resumer du News</h3>
                <p class="text-sm md:text-base leading-6">{{ newsStore.news[parseId - 1].summary }}</p>
            </div>
            <div class="max-w-4xl flex flex-col gap-3">

                <h5 class="text-base md:text-lg font-bold">Sources:</h5>
                <div>
                    <ul class="ml-4 flex flex-col gap-2">
                        <li v-for="key in Object.keys(newsStore.news[parseId - 1].titles)" :key="key">
                            <span class="font-bold">- </span>
                            <a :href="newsStore.news[parseId - 1].titles[key]" class="hover:underline font-medium"
                                target="_blank" rel="noopener noreferrer">
                                {{ newsStore.news[parseId - 1].titles[key] }}
                            </a>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </main>
</template>