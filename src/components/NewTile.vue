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
    <article class="w-full py-4 lg:py-6gi dark:border-gray-600">
        <div class="flex flex-col gap-4 lg:gap-5 items-start">
            <h3 class="text-xl lg:text-2xl font-extrabold">{{ data.titles[0] }}</h3>
            <p class="text-base leading-7">{{ description }}</p>
            <RouterLink @click="setDetailAndNavigate" :to="`/info/` + id"
                class="text-sm font-semibold  hover:underline cursor-pointer duration-300">
                En savoir plus
                <span class="text-lg">&rsaquo;</span>
            </RouterLink>
        </div>
    </article>
</template>