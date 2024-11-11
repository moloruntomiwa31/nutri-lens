<template>
  <div class="flex items-center justify-center h-full mt-4">
    <div
      class="border-2 border-grayColor rounded-lg w-11/12 md:w-[600px] lg:w-[700px] xl:w-[800px] p-4"
    >
      <Icon
        name="gg:arrow-left-o"
        class="text-black"
        size="36"
        @click="router.back()"
      />
      <div class="flex flex-col-reverse items-center gap-6">
        <!-- content -->
        <div class="space-y-10">
          <div class="header">
            <BaseHeading size="2xl" as="h2">{{
              exactRecipe?.name
            }}</BaseHeading>
            <div class="space-y-2">
              <BaseText customClass="text-gray-700">
                {{ exactRecipe?.description }}
              </BaseText>
              <div class="info flex items-center justify-between">
                <div>
                  <BaseHeading weight="semibold" size="xs" as="h4"
                    >Preparation Time</BaseHeading
                  >
                  <BaseText customClass="text-gray-700">
                    {{ exactRecipe?.preparationTime }}mins
                  </BaseText>
                </div>
                <div>
                  <BaseHeading as="h4" size="xs" weight="semibold"
                    >Difficulty</BaseHeading
                  >
                  <BaseText
                    customClass="text-gray-700 flex items-center gap-1 capitalize"
                  >
                    {{ exactRecipe?.difficulty }}
                    <BaseText as="span">{{
                      difficultyEmojis[exactRecipe?.difficulty]
                    }}</BaseText>
                  </BaseText>
                </div>
                <div>
                  <BaseHeading as="h4" size="xs" weight="semibold"
                    >Ratings</BaseHeading
                  >
                  <StarRating :rating="exactRecipe?.rating" />
                </div>
              </div>
            </div>
          </div>
          <!-- Rest of the template remains the same -->
          <div class="nutritional-facts">
            <BaseHeading as="h3" weight="bold" size="xl"
              >Nutritional Facts</BaseHeading
            >
            <div class="flex items-center gap-4">
              <div>
                <BaseHeading as="h5" weight="semibold" size="xs"
                  >Calories</BaseHeading
                >
                <BaseText customClass="text-gray-700" size="2xl">
                  {{ exactRecipe?.calories }}
                </BaseText>
              </div>
              <div>
                <BaseHeading as="h5" weight="semibold" size="xs"
                  >Protein</BaseHeading
                >
                <BaseText customClass="text-gray-700" size="2xl">{{
                  exactRecipe?.protein
                }}</BaseText>
              </div>
              <div>
                <BaseHeading as="h5" weight="semibold" size="xs"
                  >Fat</BaseHeading
                >
                <BaseText customClass="text-gray-700 text-2xl">{{
                  exactRecipe?.fats
                }}</BaseText>
              </div>
              <div>
                <BaseHeading as="h5" weight="semibold" size="xs"
                  >Carbs</BaseHeading
                >
                <BaseText customClass="text-gray-700 text-2xl">{{
                  exactRecipe?.carbs
                }}</BaseText>
              </div>
            </div>
          </div>
          <div class="ingredients">
            <BaseHeading as="h3" weight="bold" size="xl"
              >Ingredients</BaseHeading
            >
            <ul class="list-disc pl-5 text-gray-700">
              <li class="mb-1" v-for="ingredient in exactRecipe?.ingredients">
                {{ ingredient }}
              </li>
            </ul>
          </div>
          <div class="instructions">
            <BaseHeading as="h3" weight="bold" size="xl"
              >Instructions</BaseHeading
            >
            <ol class="list-decimal pl-5 text-gray-700">
              <li class="mb-1" v-for="instruction in exactRecipe?.instructions">
                {{ instruction }}
              </li>
            </ol>
          </div>
          <div
            class="recommendations-healthBenefits space-y-2"
            v-if="exactRecipe?.recommendation"
          >
            <BaseHeading as="h3" weight="bold" size="xl"
              >Recommendations</BaseHeading
            >
            <BaseText customClass="text-gray-700">
              {{ exactRecipe?.recommendation }}
            </BaseText>
            <BaseHeading as="h3" weight="bold" size="xl"
              >Health Benefits</BaseHeading
            >
            <BaseText customClass="text-gray-700">
              {{ exactRecipe?.healthBenefits }}
            </BaseText>
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
import { routerKey } from "vue-router";
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
const router = useRouter();
onMounted(() => {
  exactRecipe.value = recipes.find(
    (recipe) => recipe.id == Number(route.params.id)
  ) as RecipeResponse | null;
});
</script>

<style scoped></style>
