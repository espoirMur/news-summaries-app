<script setup>
import { ref, onMounted } from "vue";
import IconDark from "./icons/IconDark.vue";
import IconLight from "./icons/IconLight.vue";

const isDarkMode = ref(false);

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  const theme = isDarkMode.value ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme); // Save preference
};

onMounted(() => {
  const savedTheme = localStorage.getItem("theme");
  let theme;
  if (savedTheme) {
    theme = savedTheme;
  } else {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    theme = prefersDark ? "dark" : "light";
  }
  isDarkMode.value = theme === "dark";
  document.documentElement.setAttribute("data-theme", theme);
});
</script>

<template>
  <header class="w-full">
    <div
      class="max-w-5xl mx-auto px-6 lg:px-8 flex justify-between py-6 items-center"
    >
      <h1 class="text-3xl font-extrabold">BN.</h1>
      <button
        @click="toggleTheme"
        class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
        aria-label="Toggle Theme"
      >
        <IconDark v-if="!isDarkMode" class="w-6 h-6" />
        <IconLight v-else class="w-6 h-6" />
      </button>
    </div>
  </header>
</template>
