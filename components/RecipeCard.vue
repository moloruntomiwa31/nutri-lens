<template>
  <div class="relative flex-shrink-0">
    <div
      class="bg-cover bg-center w-[270px] h-[400px] rounded-lg"
      :style="{
        backgroundImage: 'url(/images/landing/landing.jpg)',
      }"
    >
      <div
        class="absolute bottom-4 left-4 flex items-center bg-white bg-opacity-80 rounded-full px-4 py-2 transition-transform hover:scale-105"
        role="button"
        tabindex="0"
      >
        <span
          class="w-12 h-3 bg-secondaryGreen rounded-full mr-2"
          aria-hidden="true"
        ></span>
        <span class="text-sm font-medium">See full recipe</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
