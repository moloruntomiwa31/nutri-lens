<template>
  <div class="px-4 space-y-8">
    <div class="py-5 lg:py-0">
      <h2 class="font-bold text-3xl mb-4">Healthy Recipes😋</h2>
      <div
        class="flex items-center gap-4 overflow-x-auto min-w-full scrollbar-hide"
      >
        <div class="relative" v-for="i in 8" :key="i">
          <div
            class="bg-cover bg-center w-[270px] h-[400px] rounded-lg"
            :style="{ backgroundImage: `url('/images/landing/landing.jpg')` }"
          >
            <div
              class="absolute bottom-4 left-4 flex items-center bg-white bg-opacity-80 rounded-full px-4 py-2"
            >
              <span class="w-12 h-3 bg-secondaryGreen rounded-full mr-2"></span>
              <span class="text-sm font-medium">See full recipe</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="relative">
      <img
        src="/public/images/mom-eating.jpg"
        alt="Recipe of the Day"
        class="w-full h-auto rounded-lg shadow-lg"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent rounded-lg"
      ></div>
      <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 class="text-3xl font-bold mb-2 text-shadow">Recipe of the Day</h3>
        <p class="text-lg shadow">Discover today's culinary delight</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});
</script>

<style scoped></style>
