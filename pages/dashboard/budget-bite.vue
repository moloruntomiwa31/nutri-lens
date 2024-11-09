<template>
  <div class="flex items-center justify-center h-full mt-4">
    <div
      class="w-4/5 md:w-[600px] lg:w-[700px] xl:w-[800px] lg:h-[500px] p-6 bg-grayColor rounded-lg"
    >
      <h2 class="text-2xl font-bold">Budget Bite</h2>

      <div class="w-full">
        <div class="flex items-center gap-4 w-full">
          <div class="md:flex-1">
            <label> Daily Budget </label>
            <BaseInput
              v-model="mealBudget.amount"
              type="number"
              placeholder="Enter amount"
              :error="errors.amount"
            />
          </div>
          <div class="w-32">
            <label> Currency </label>
            <BaseSelect
              class="!mx-0"
              placeholder="NGN"
              v-model="mealBudget.currency"
              :options="['NGN', 'USD', 'GBP', 'EUR']"
            />
          </div>
        </div>
        <BaseButton @click="generateMeals" customClass="rounded-lg my-[25px]">
          Find Meals
        </BaseButton>

        <!-- Results -->
        <!-- <div v-if="mealSuggestions" class="grid md:grid-cols-3 gap-4">
          <div v-for="(meals, type) in mealSuggestions" :key="type">
            <h3 class="font-medium capitalize mb-2">{{ type }}</h3>
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
        </div> -->
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

const { mealBudget, errors, generateMeals } = useBudgetBite();
</script>
