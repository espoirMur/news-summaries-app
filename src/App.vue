<script setup>
import Header from './components/Header.vue';


</script>

<template>
  <Header />
  <RouterView />
  <footer class="w-full py-4 lg:py-6">
    <div class="max-w-7xl mx-auto px-6 lg:px-8 font-montserrat flex justify-end ">
      <span class="text-base font-normal"> &copy; 2024</span>
    </div>
  </footer>
</template>
