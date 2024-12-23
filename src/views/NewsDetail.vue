<script setup>
import { RouterLink } from 'vue-router';
import { useNewsStore } from "@/stores/newsStore";
import { computed, ref } from 'vue';

const LoadingSummaries = ref(false)

const newsStore = useNewsStore();

console.log(newsStore.news_detail)

const formattedNewsDetail = computed(() => {
    if (!newsStore.news_detail) return null;

    const detail = newsStore.news_detail;
    const summary = detail.summary;

    let title = detail.titles[0]; // Fallback to the first title
    let updatedSummary = summary;

    const titleMatch = summary.match(/Titre:\s*(.+?)\nRésumé:/s);
    const summaryMatch = summary.match(/Résumé:\s*(.+)/s);

    if (titleMatch) {
        title = titleMatch[1].trim(); // Extract title between "Titre:" and "Résumé:"
    }
    if (summaryMatch) {
        updatedSummary = summaryMatch[1].trim(); // Extract content after "Résumé:"
    }

    return {
        ...detail,
        title,
        summary: updatedSummary,
    };
});

</script>
<template>
    <main class="max-w-5xl mx-auto px-6 lg:px-8 mt-8  min-h-[80svh] font-montserrat">
        <div v-if="LoadingSummaries" class="w-full flex min-h-[50svh] justify-center items-center">
            <span class="loading loading-spinner loading-md"></span>
        </div>
        <div v-else-if="formattedNewsDetail" class="grid grid-cols-1 gap-8">
            <div class="flex flex-col items-start">
                <RouterLink to="/"
                    class="flex items-center flex-row text-sm px-6 py-2 rounded-md text-gray-200 bg-gray-700 hover:bg-gray-800">
                    Retour
                    en
                    arrieure
                </RouterLink>
            </div>
            <div class="flex flex-col gap-4 lg:gap-6 col-span-1 ">
                <h3 class="text-2xl md:text-3xl font-bold">Titre: {{ formattedNewsDetail.title }}</h3>
                <p class="text-sm md:text-base leading-6">{{ formattedNewsDetail.summary }}</p>
            </div>
            <div class="max-w-4xl flex flex-col gap-3">

                <h5 class="text-base md:text-lg font-bold">Sources:</h5>
                <div>
                    <ul class="ml-4 flex flex-col gap-2">
                        <li v-for="key in Object.keys(formattedNewsDetail.titles)" :key="key">
                            <span class="font-bold">- </span>
                            <a :href="formattedNewsDetail.titles[key]" class="hover:underline font-medium"
                                target="_blank" rel="noopener noreferrer">
                                {{ formattedNewsDetail.titles[key] }}
                            </a>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </main>
</template>