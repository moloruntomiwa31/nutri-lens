<template>
  <div class="relative flex-shrink-0">
    <div
      class="bg-grayColor bg-center w-[270px] h-[400px] rounded-lg overflow-hidden"
      @click="router.push(`/dashboard/recipe/${recipe.id}`)"
    >
      <NuxtImg
        v-if="recipe.image"
        :src="recipe.image"
        width="270"
        height="400"
        class="w-full h-full object-cover"
        loading="lazy"
      />
      <div
        v-else
        class="w-full h-full bg-gray-200 flex items-center justify-center"
      >
        <span class="text-gray-400">No image available</span>
      </div>
      <div
        class="absolute bottom-4 left-4 flex items-center bg-white bg-opacity-80 rounded-full px-4 py-2 transition-transform hover:scale-105 cursor-pointer"
        role="button"
        tabindex="0"
      >
        <span
          class="w-12 h-3 bg-secondaryGreen rounded-full mr-2"
          aria-hidden="true"
        ></span>
        <span class="text-sm font-medium">{{ recipe.name }}</span>
      </div>
      <div
        class="absolute top-4 right-4 bg-white bg-opacity-90 rounded-lg p-3 text-xs space-y-1"
      >
        <div>Calories: {{ recipe.calories }}</div>
        <div>Protein: {{ recipe.protein }}</div>
        <div>Carbs: {{ recipe.carbs }}</div>
        <div>Fats: {{ recipe.fats }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type RecipeResponse from "~/types/RecipeResponse";
const router = useRouter();
defineProps<{
  recipe: RecipeResponse;
}>();
</script>

<style scoped>
.bg-opacity-80 {
  backdrop-filter: blur(4px);
}
</style>
