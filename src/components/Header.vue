<script setup>
import { ref, onMounted } from "vue";
import IconDark from './icons/IconDark.vue';
import IconLight from './icons/IconLight.vue';

const isDarkMode = ref(false);

const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value;
    const theme = isDarkMode.value ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme); // Save preference
};
onMounted(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        isDarkMode.value = savedTheme === "dark";
    } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        isDarkMode.value = prefersDark;
    }
    const theme = isDarkMode.value ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
});
</script>

<template>
    <header class="w-full">
        <div class="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between py-6 items-center">
            <h1 class="text-3xl font-extrabold">N.</h1>
            <div>
                <label class="flex cursor-pointer gap-2 items-center">
                    <IconDark />
                    <input type="checkbox" class="toggle theme-controller" :checked="isDarkMode"
                        @change="toggleTheme" />
                    <IconLight />
                </label>
            </div>
        </div>
    </header>
</template>