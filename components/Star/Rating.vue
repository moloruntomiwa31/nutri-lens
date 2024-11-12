<template>
  <div class="flex items-center gap-0.5">
    <div v-for="index in maxStars" :key="index" class="relative">
      <!-- Empty star -->
      <Star size="5" customClass="w-5 h-5 text-gray-300" />

      <!-- Filled star -->
      <div
        class="absolute inset-0 overflow-hidden"
        :style="{
          width: `${Math.max(0, Math.min(100, (newRating - (index - 1)) * 100))}%`,
        }"
      >
        <Star size="5" customClass="w-5 h-5 text-yellow-400" />
      </div>
    </div>

    <span class="ml-2 text-sm" :class="[textColor]">{{ newRating.toFixed(1) }}</span>
  </div>
</template>

<script setup lang="ts">
const { rating = undefined, maxStars = 5, textColor = "text-gray-600" } = defineProps<{
  rating?: string;
  maxStars?: number;
  textColor?: string;
}>();
const newRating = computed(() =>
  typeof rating === "string" ? Number(rating) : rating ?? 0
);
</script>
