<script setup>
import Header from "./components/Header.vue";
const currentYear = new Date().getFullYear();
</script>

<template>
  <Header />
  <RouterView />
  <footer class="w-full py-4 lg:py-6">
    <div
      class="max-w-5xl mx-auto px-6 lg:px-8 font-montserrat flex justify-end"
    >
      <div class="flex flex-col gap-1">
        <p class="text-sm font-semibold">
          Design with love from Congo by Grace NSHOKANO
        </p>
        <p class="text-sm font-semibold">Design with love ❤️ from 🇨🇩 💪🏿!</p>
        <span class="text-base font-medium"> Balobi Nini &copy; {{ currentYear }}</span>
      </div>
    </div>
  </footer>
</template>
