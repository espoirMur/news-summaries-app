<script setup>
defineProps({
    imgUrl: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    href: {
        type: String,
        required: true
    },
})
</script>

<template>
    <div class="w-full rounded-xl lg:h-[50svh] min-h-[60svh] relative">
        <div class="w-full h-full">
            <img class="w-full lg:h-[50svh] min-h-[60svh] object-cover rounded-xl" :src="imgUrl" alt="banner">
        </div>
        <div class="absolute top-0 right-0 left-0 bottom-0 bg-black rounded-xl px-8 bg-opacity-50 flex items-center">
            <div class="max-w-3xl flex flex-col gap-6 items-start text-gray-50">
                <h1 class="text-2xl lg:text-3xl font-extrabold">{{ title }}</h1>
                <p>{{ description }}</p>
                <a target="_blank"
                    class="text-gray-800 px-6 py-2 text-sm bg-gray-200 rounded-lg font-medium hover:bg-slate-900 hover:text-gray-100 duration-300"
                    :href="href">Lire
                    plus</a>
            </div>
        </div>
    </div>
</template>