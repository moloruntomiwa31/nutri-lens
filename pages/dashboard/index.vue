<template>
  <div class="container mx-auto px-4 space-y-8 py-6">
    <section aria-labelledby="recipe-section-title" class="py-5 lg:py-0">
      <h2 id="recipe-section-title" class="font-bold text-3xl mb-6">
        Healthy Recipes
        <span role="img" aria-label="delicious food emoji">😋</span>
      </h2>

      <div
        class="flex items-center gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
        role="region"
        aria-label="Recipe cards carousel"
      >
        <DashboardRecipeCard
          v-if="recipes.length > 0"
          class="snap-center"
          v-for="recipe in recipes"
          :key="recipe.id"
          :recipe
        />
        <DashboardEmptyState
          v-else
          v-for="i in 5"
          :key="i"
          class="snap-center"
        />
      </div>
    </section>

    <section aria-labelledby="recipe-of-day-title" class="relative">
      <img
        src="/public/images/mom-eating.jpg"
        alt="Mother enjoying a healthy meal"
        class="w-full h-[400px] object-cover rounded-lg shadow-lg"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent rounded-lg"
        aria-hidden="true"
      ></div>
      <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 id="recipe-of-day-title" class="text-3xl font-bold mb-2">
          Recipe of the Day
        </h3>
        <p class="text-lg">Discover today's culinary delight</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Dashboard",
  meta: [
    {
      name: "description",
      content: "Discover healthy recipes and meal plans",
    },
  ],
})
useSeoMeta({
  title: "Dashboard",
  description: "Discover healthy recipes and meal plans",
  ogDescription: "Discover healthy recipes and meal plans",
  ogTitle: "Dashboard",
  ogImage: "/images/nutri-lens.png",
})
definePageMeta({
  layout: "dashboard",
});

const { recipes } = useGenerateRecipes();
</script>

<style scoped>
.overflow-x-auto {
  scrollbar-width: thin;
  scrollbar-color: theme("colors.gray.300") theme("colors.gray.100");
}

::-webkit-scrollbar {
  height: 6px;
}

::-webkit-scrollbar-track {
  background: theme("colors.gray.100");
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background-color: theme("colors.gray.300");
  border-radius: 3px;
}
</style>
