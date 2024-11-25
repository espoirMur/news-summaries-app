<script setup>
import { RouterLink } from "vue-router";
defineProps({
    id: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },


})
</script>

<template>
    <article class="w-full py-4 lg:py-6 border-b dark:border-gray-600 border-gray-200">
        <div class="flex flex-col gap-4 lg:gap-5 items-start">
            <!-- <p class="text-sm">{{ moment(published).format("ll") }}</p>
            <h3 class="text-xl lg:text-2xl font-extrabold">{{ title }}</h3> -->
            <p class="text-base">{{ description.substring(0, 250) }}...</p>
            <RouterLink :to="`/info/` + id" class="text-sm font-semibold hover:underline cursor-pointer duration-300">
                En savoir plus
                <span class="text-lg">&rsaquo;</span>
            </RouterLink>

        </div>
    </article>
</template>