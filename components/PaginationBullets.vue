<template>
    <div class="flex space-x-2">
      <div
        v-for="i in total"
        :key="i"
        :class="[
          'w-2 h-2 rounded-full',
          i-1 === current ? 'bg-primaryGreen' : 'bg-grayColor',
        ]"
      ></div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    current: Number,
    total: Number,
  });
  </script>