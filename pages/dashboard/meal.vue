<template>
  <div class="flex items-center justify-center h-full mt-4">
    <div
      class="bg-grayColor rounded-lg w-4/5 md:w-[600px] lg:w-[700px] xl:w-[800px] h-[500px] p-6"
    >
      <!-- Progress Steps -->
      <div class="flex items-center justify-center">
        <template v-for="(step, index) in steps" :key="step.id">
          <div class="flex items-center">
            <a
              :class="[
                'flex items-center gap-2',
                {
                  'cursor-pointer': step.detail === 'upload' || steps[0].done,
                  'cursor-not-allowed':
                    step.detail === 'result' && !steps[0].done,
                  'text-secondaryGreen font-bold': step.done,
                  'text-primaryPurple font-bold':
                    currentStep.id === step.id && !step.done,
                  'text-black font-medium':
                    !step.done && currentStep.id !== step.id,
                },
              ]"
              @click="setCurrentStep(step)"
            >
              <BaseText
                as="span"
                customClass="w-8 h-8 rounded-full flex items-center justify-center bg-white shadow"
              >
                <Icon size="24" name="lets-icons:check-fill" v-if="step.done" />
                <BaseText as="span" v-else weight="bold">{{
                  index + 1
                }}</BaseText>
              </BaseText>
              <BaseText as="span" customClass="hidden md:block" size="sm">{{
                step.name
              }}</BaseText>
            </a>
          </div>
          <BaseText
            as="span"
            v-if="index < steps.length - 1"
            customClass="w-20 h-0.5 bg-primaryPurple mx-2 rounded-full"
          />
        </template>
      </div>

      <!-- Upload Section -->
      <template v-if="currentStep.detail === 'upload'">
        <div class="flex flex-col items-center justify-center gap-4 py-2 h-4/5">
          <div
            class="flex flex-col items-center justify-center w-11/12 h-[300px] bg-white rounded-xl relative"
          >
            <BaseFileInput
              accept="image/"
              @update:modelValue="handleImageSelection"
            >
              <Icon name="heroicons:arrow-up-tray" :size="imageUrl ? 40 : 80" />
            </BaseFileInput>
            <div
              class="flex flex-col items-center justify-center cursor-pointer"
              @click="fileInput?.click()"
            >
              <BaseText customClass="text-black mt-2 text-center" as="span"
                >Click to upload image of meal</BaseText
              >
            </div>
          </div>

          <div v-if="imageUrl" class="flex justify-center w-full">
            <img
              :src="imageUrl"
              alt="Image Preview"
              class="rounded-lg h-auto w-64 object-cover"
            />
          </div>

          <div v-if="error" class="text-primaryRed text-sm text-center">
            {{ error }}
          </div>
        </div>
      </template>

      <!-- Results Section -->
      <template v-if="currentStep.detail === 'result' && result">
        <div class="h-4/5 overflow-y-auto">
          <BaseHeading as="h2" weight="bold" size="xl"
            >Analysis Result</BaseHeading
          >

          <div
            class="grid w-full grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-6"
          >
            <div
              v-for="(value, key) in nutritionData"
              :key="key"
              class="bg-white p-4 rounded-lg shadow w-38 h-32 md:h-28 md:w-40"
            >
              <BaseText
                as="span"
                customClass="capitalize"
                weight="medium"
                size="lg"
                >{{ key }}</BaseText
              >
              <BaseText
                as="span"
                customClass="block text-gray-700"
                weight="medium"
                >{{ value }}</BaseText
              >
            </div>
          </div>

          <div v-if="result.ingredients" class="mb-6">
            <BaseHeading as="h3" weight="bold" size="lg"
              >Ingredients</BaseHeading
            >
            <ul class="list-disc pl-5">
              <li
                v-for="ingredient in result.ingredients"
                :key="ingredient"
                class="mb-1 text-gray-700"
              >
                {{ ingredient }}
              </li>
            </ul>
          </div>

          <div v-if="result.healthBenefits" class="mb-6">
            <BaseHeading as="h3" weight="bold" size="lg"
              >Health Benefits</BaseHeading
            >
            <BaseText customClass="text-gray-700">{{
              result.healthBenefits
            }}</BaseText>
          </div>

          <div v-if="result.recommendation" class="mb-6">
            <BaseHeading as="h3" weight="bold" size="lg"
              >Recommendation</BaseHeading
            >
            <BaseText class="text-gray-700">{{
              result.recommendation
            }}</BaseText>
          </div>
        </div>
      </template>

      <!-- Action Buttons -->
      <div class="flex justify-end w-full mt-4">
        <BaseButton
          v-if="currentStep.detail === 'upload' && imageUrl"
          class="px-6 py-2 text-white rounded-lg shadow"
          :disabled="!canProceedToNext || isLoading"
          :loading="isLoading"
          @click="() => image && analyzeMeal(image)"
        >
          {{ isLoading ? "Analyzing..." : "Analyze" }}
        </BaseButton>

        <BaseButton
          v-if="currentStep.detail === 'result'"
          class="px-6 py-2 text-white rounded-lg shadow"
          color="blue"
          @click="resetAnalyzer"
        >
          Analyze Another Meal
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Meal Analyzer",
  meta: [
    {
      name: "description",
      content:
        "Analyze your meal and get nutrition information using NutriLens AI.",
    },
  ],
});
useSeoMeta({
  title: "Meal Analyzer",
  description:
    "Analyze your meal and get nutrition information using NutriLens AI.",
  ogDescription:
    "Analyze your meal and get nutrition information using NutriLens AI.",
  ogTitle: "Meal Analyzer",
  ogImage: "/images/nutri-lens.png",
});
definePageMeta({
  layout: "dashboard",
});

const {
  fileInput,
  image,
  imageUrl,
  isLoading,
  error,
  result,
  steps,
  currentStep,
  handleImageSelection,
  analyzeMeal,
  resetAnalyzer,
  setCurrentStep,
  canProceedToNext,
} = useMealAnalyzer();

const nutritionData = computed(() => {
  if (!result.value) return {};
  return {
    calories: `${result.value.calories}kcals`,
    protein: `${result.value.protein}g`,
    carbs: `${result.value.carbs}g`,
    fat: `${result.value.fat}g`,
  };
});
</script>
