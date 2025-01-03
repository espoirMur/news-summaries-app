<script setup>
import { useNewsStore } from "@/stores/newsStore";
import { watch } from "vue";
import { RouterLink } from "vue-router";
const { data, description, id, title } = defineProps({
    id: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    title: {
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
    newsStore.setNewsDetail({ ...data }); // Pass a shallow copy to avoid reactivity issues
};

watch(
    () => newsStore.news_detail,
    (newDetail) => {
        console.log("news_detail changed:", newDetail);
    },
    { immediate: true }
);

</script>

<template>
    <article class="w-full py-4 lg:py-6 dark:border-gray-600">
        <div class="flex flex-col gap-4 lg:gap-5 items-start">
            <h3 class="text-xl lg:text-2xl font-extrabold">{{ title }}</h3>
            <p class="text-base leading-7">{{ description }}</p>
            <RouterLink @click="setDetailAndNavigate" :to="`/info/` + parseInt(id + 1)"
                class="text-sm font-semibold  hover:underline cursor-pointer duration-300">
                En savoir plus
                <span class="text-lg">&rsaquo;</span>
            </RouterLink>
        </div>
    </article>
</template>