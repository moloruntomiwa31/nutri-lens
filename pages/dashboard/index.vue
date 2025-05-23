<template>
  <div class="container mx-auto px-4 space-y-8 py-4">
    <section aria-labelledby="recipe-section-title" class="lg:py-0">
      <BaseHeading as="h2" size="2xl" customClass="mb-6">
        Healthy Recipes
        <span role="img" aria-label="delicious food emoji">😋</span>
      </BaseHeading>

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
      <div>
        <img
          v-if="!recipe.image"
          src="/public/images/mom-eating.jpg"
          alt="Woman eating healthy food"
          class="w-full h-[400px] object-cover rounded-lg shadow-lg"
        />
        <NuxtImg
          v-else
          :src="recipe.image"
          alt="No image"
          class="w-full h-[400px] object-cover rounded-lg shadow-lg"
        />
      </div>
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-lg"
        aria-hidden="true"
      ></div>
      <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
        <BaseHeading as="h2" size="2xl" customClass="mb-2">
          Recipe of the Day
        </BaseHeading>
        <div v-if="recipe.name" class="my-4">
          <BaseHeading as="h4" size="xl" weight="semibold">{{
            recipe.name
          }}</BaseHeading>
          <BaseText weight="normal" size="sm">{{
            recipe.description
          }}</BaseText>
        </div>
        <BaseText size="lg" v-else
          >Discover healthy recipes and meal plans.</BaseText
        >
        <div
          v-if="recipe.calories"
          class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div class="flex items-center gap-4">
            <div>
              <BaseHeading as="h5" weight="semibold" size="sm"
                >Calories</BaseHeading
              >
              <BaseText customClass="text-gray-400">
                {{ recipe.calories }}
              </BaseText>
            </div>
            <div>
              <BaseHeading as="h5" weight="semibold" size="sm"
                >Protein</BaseHeading
              >
              <BaseText customClass="text-gray-400">{{
                recipe.protein
              }}</BaseText>
            </div>
            <div>
              <BaseHeading as="h5" weight="semibold" size="sm">Fat</BaseHeading>
              <BaseText customClass="text-gray-400">{{ recipe.fats }}</BaseText>
            </div>
            <div>
              <BaseHeading as="h5" weight="semibold" size="sm"
                >Carbs</BaseHeading
              >
              <BaseText customClass="text-gray-400">{{
                recipe.carbs
              }}</BaseText>
            </div>
          </div>
          <div>
            <BaseHeading as="h5" size="sm" weight="semibold"
              >Ratings</BaseHeading
            >
            <StarRating :rating="recipe.rating" textColor="text-gray-300" />
          </div>
        </div>
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
});
useSeoMeta({
  title: "Dashboard",
  description: "Discover healthy recipes and meal plans",
  ogDescription: "Discover healthy recipes and meal plans",
  ogTitle: "Dashboard",
  ogImage: "/images/nutri-lens.png",
});
definePageMeta({
  layout: "dashboard",
});

const { recipes } = useGenerateRecipes();
const router = useRouter();
//generate recipe of the day
const { recipe, generateRecipeOfTheDay } = useRecipeOfTheDay();
onMounted(async () => await generateRecipeOfTheDay());
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
