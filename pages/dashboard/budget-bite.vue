<template>
  <div class="flex items-center justify-center h-full mt-4">
    <div
      class="w-4/5 md:w-[600px] lg:w-[700px] xl:w-[800px] lg:min-h-[500px] p-6 bg-grayColor rounded-lg"
    >
      <BaseHeading as="h2" weight="bold" size="2xl">Budget Bite</BaseHeading>
      <div class="w-full">
        <div class="flex items-center gap-4 w-full">
          <div class="md:flex-1">
            <BaseText as="label" weight="medium">Daily Budget</BaseText>
            <BaseInput
              v-model="mealBudget.amount"
              type="number"
              placeholder="Enter amount"
              :error="errors.amount"
            />
          </div>
          <div class="w-32">
            <BaseText as="label" weight="medium">Currency</BaseText>
            <BaseSelect
              class="!mx-0"
              placeholder="NGN"
              v-model="mealBudget.currency"
              :options="['NGN', 'USD', 'GBP', 'EUR']"
            />
          </div>
        </div>
        <BaseButton
          @click="generateMeals"
          :loading
          :disabled="loading"
          customClass="rounded-lg my-[25px]"
        >
          Find Meals
        </BaseButton>

        <div v-if="error">
          <BaseText customClass="text-primaryRed">{{ error }}</BaseText>
        </div>

        <!-- Results -->
        <div v-if="result" class="w-full space-y-4">
          <!-- Meal Types Grid -->
          <div class="grid md:grid-cols-3 gap-4">
            <div
              v-for="(meals, type) in mealTypes"
              :key="type"
              class="bg-white rounded-lg border border-grayColor p-4 shadow-lg"
            >
              <BaseHeading
                as="h3"
                weight="medium"
                customClass="capitalize mb-2"
              >
                {{ type }}
              </BaseHeading>

              <ul class="list-disc list-inside space-y-1">
                <li
                  v-for="(meal, index) in meals"
                  :key="index"
                  class="text-sm text-gray-700"
                >
                  {{ meal }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Budget Summary -->
          <div
            class="flex gap-3 flex-col md:flex-row md:justify-between md:items-center p-4 bg-gray-50 rounded-lg"
          >
            <div class="space-y-1">
              <BaseText size="lg" weight="medium">Average Cost:</BaseText>
              <BaseText customClass="text-gray-700" size="sm">
                {{ result.averageCost }}{{ mealBudget.currency }}
              </BaseText>
            </div>
            <div class="space-y-1">
              <BaseText size="lg" weight="medium">Average Amount Left:</BaseText>
              <BaseText customClass="text-gray-700" size="sm">
                {{ result.averageAmountLeft }}{{ mealBudget.currency }}
              </BaseText>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "Budget Bite",
  meta: [
    {
      name: "description",
      content: "Generating meals with our AI based on your budget.",
    },
  ],
});
useSeoMeta({
  title: "Budget Bite",
  description: "Generating meals with our AI based on your budget.",
  ogDescription: "Generating meals with our AI based on your budget.",
  ogImage: "/images/nutri-lens.png",
});
definePageMeta({
  layout: "dashboard",
});

const { mealBudget, errors, generateMeals, error, loading, result } =
  useBudgetBite();
const mealTypes = computed(() => {
  const { breakfast, lunch, dinner } = result.value;
  return { breakfast, lunch, dinner };
});
</script>
