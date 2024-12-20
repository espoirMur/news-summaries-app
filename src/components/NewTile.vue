<script setup>
import { useNewsStore } from "@/stores/newsStore";
import { RouterLink } from "vue-router";
const { data, description, id } = defineProps({
    id: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        required: true, // Expect the object containing titles, URLs, and summary
    },
})


const newsStore = useNewsStore();

const setDetailAndNavigate = () => {
    newsStore.setNewsDetail(data);
};
</script>

<template>
    <article class="w-full py-4 lg:py-6 border-b dark:border-gray-600 border-gray-200">
        <div class="flex flex-col gap-4 lg:gap-5 items-start">
            <p class="text-base">{{ description.substring(0, 250) }}...</p>
            <RouterLink @click="setDetailAndNavigate" :to="`/info/` + id"
                class="text-sm font-semibold  hover:underline cursor-pointer duration-300">
                En savoir plus
                <span class="text-lg">&rsaquo;</span>
            </RouterLink>

        </div>
    </article>
</template>