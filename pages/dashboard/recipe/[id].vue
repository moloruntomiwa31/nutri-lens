<template>
  <div class="flex items-center justify-center h-full mt-4">
    <div
      class="border-2 border-grayColor rounded-lg w-11/12 md:w-[600px] lg:w-[700px] xl:w-[800px] p-4"
    >
      <div class="flex flex-col-reverse items-center gap-6">
        <!-- content -->
        <div class="space-y-10">
          <div class="header">
            <h2 class="font-bold text-3xl">{{ exactRecipe?.name }}</h2>
            <div class="space-y-2">
              <p class="text-sm text-gray-700">
                {{ exactRecipe?.description }}
              </p>
              <div class="info flex items-center justify-between">
                <div>
                  <h4 class="font-semibold text-xs">Preparation Time</h4>
                  <p class="text-gray-700">
                    {{ exactRecipe?.preparationTime }}mins
                  </p>
                </div>
                <div>
                  <h4 class="font-semibold text-xs">Difficulty</h4>
                  <p class="text-gray-700 flex items-center gap-1 capitalize">
                    {{ exactRecipe?.difficulty }}
                    <span>{{ difficultyEmojis[exactRecipe?.difficulty] }}</span>
                  </p>
                </div>
                <div>
                  <h4 class="font-semibold text-xs">Ratings</h4>
                  <p class="text-gray-700">{{ exactRecipe?.rating }}/5</p>
                </div>
              </div>
            </div>
          </div>
          <!-- Rest of the template remains the same -->
          <div class="nutritional-facts">
            <h3 class="font-bold text-xl">Nutritional Facts</h3>
            <div class="flex items-center gap-4">
              <div>
                <h4 class="font-semibold text-xs">Calories</h4>
                <p class="text-gray-700 text-2xl">
                  {{ exactRecipe?.calories }}
                </p>
              </div>
              <div>
                <h4 class="font-semibold text-xs">Protein</h4>
                <p class="text-gray-700 text-2xl">{{ exactRecipe?.protein }}</p>
              </div>
              <div>
                <h4 class="font-semibold text-xs">Fat</h4>
                <p class="text-gray-700 text-2xl">{{ exactRecipe?.fats }}</p>
              </div>
              <div>
                <h4 class="font-semibold text-xs">Carbs</h4>
                <p class="text-gray-700 text-2xl">{{ exactRecipe?.carbs }}</p>
              </div>
            </div>
          </div>
          <div class="ingredients">
            <h3 class="font-bold text-xl">Ingredients</h3>
            <ul class="list-disc pl-5 text-gray-700">
              <li class="mb-1" v-for="ingredient in exactRecipe?.ingredients">
                {{ ingredient }}
              </li>
            </ul>
          </div>
          <div class="instructions">
            <h3 class="font-bold text-xl">Instructions</h3>
            <ol class="list-decimal pl-5 text-gray-700">
              <li class="mb-1" v-for="instruction in exactRecipe?.instructions">
                {{ instruction }}
              </li>
            </ol>
          </div>
          <div class="recommendations-healthBenefits space-y-2" v-if="exactRecipe?.recommendation">
            <h3 class="font-bold text-xl">Recommendations</h3>
            <p class="text-gray-700">
              {{ exactRecipe?.recommendation }}
            </p>
            <h3 class="font-bold text-xl">Health Benifits</h3>
            <p class="text-gray-700">
              {{ exactRecipe?.healthBenefits }}
            </p>
          </div>
        </div>
        <!-- Image -->
        <div>
          <NuxtImg
            :src="exactRecipe?.image"
            width="270"
            height="400"
            class="w-full h-64 object-cover rounded-lg shadow-sm bg-grayColor"
            :alt="exactRecipe?.name"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type RecipeResponse from "~/types/RecipeResponse";
const exactRecipe = ref<null | RecipeResponse>(null);
useHead({
  title: exactRecipe.value?.name || "Recipe",
  meta: [
    {
      name: "description",
      content:
        exactRecipe.value?.description ||
        "Discover healthy recipes and meal plans",
    },
  ],
});
useSeoMeta({
  title: exactRecipe.value?.name || "Recipe",
  description:
    exactRecipe.value?.description || "Discover healthy recipes and meal plans",
  ogDescription:
    exactRecipe.value?.description || "Discover healthy recipes and meal plans",
  ogTitle: exactRecipe.value?.name || "Recipe",
  ogImage: exactRecipe.value?.image || "",
});

const difficultyEmojis = {
  easy: "😋",
  medium: "😅",
  hard: "😰",
};

definePageMeta({
  layout: "dashboard",
});

const { recipes } = useGenerateRecipes();
const route = useRoute();
onMounted(() => {
  exactRecipe.value = recipes.find(
    (recipe) => recipe.id == Number(route.params.id)
  ) as RecipeResponse | null;
});
</script>

<style scoped></style>
