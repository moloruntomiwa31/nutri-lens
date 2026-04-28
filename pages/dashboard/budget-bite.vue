<template>
  <div class="max-w-4xl mx-auto space-y-8 pb-12 animate-fade-in">
    <!-- Header -->
    <div class="text-center space-y-2">
      <BaseHeading as="h1" size="2xl" weight="bold" class="text-gray-900">Budget Bite</BaseHeading>
      <BaseText class="text-gray-500 text-lg">Smart meal planning tailored to your wallet.</BaseText>
    </div>

    <!-- Input Section -->
    <div class="glass-morphism rounded-[3rem] p-8 md:p-10 border border-white/50 shadow-2xl shadow-black/5">
      <div class="flex flex-col md:flex-row items-end gap-6">
        <div class="flex-1 space-y-2 w-full">
          <BaseText as="label" weight="medium" class="text-xs text-gray-400 uppercase tracking-widest ml-1">Daily Budget</BaseText>
          <div class="relative">
            <div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Icon name="heroicons-outline:currency-dollar" size="20" />
            </div>
            <BaseInput
              v-model="mealBudget.amount"
              type="number"
              placeholder="Enter amount"
              :error="errors.amount"
              class="rounded-2xl border-gray-100 pl-12 h-14"
            />
          </div>
        </div>
        
        <div class="w-full md:w-32 space-y-2">
          <BaseText as="label" weight="medium" class="text-xs text-gray-400 uppercase tracking-widest ml-1">Currency</BaseText>
          <BaseSelect
            class="!mx-0 rounded-2xl border-gray-100 h-14"
            placeholder="NGN"
            v-model="mealBudget.currency"
            :options="['NGN', 'USD', 'GBP', 'EUR']"
          />
        </div>

        <BaseButton
          @click="generateMeals"
          :loading="loading"
          :disabled="loading"
          customClass="h-14 px-10 rounded-2xl bg-secondaryGreen shadow-xl shadow-secondaryGreen/20 transform hover:scale-105 active:scale-95 transition-all font-bold whitespace-nowrap w-full md:w-auto"
        >
          Find My Meals
        </BaseButton>
      </div>

      <div v-if="error" class="mt-4 bg-red-50 text-primaryRed p-4 rounded-2xl border border-red-100 text-sm">
        {{ error }}
      </div>
    </div>

    <!-- Results Section -->
    <div v-if="result" class="space-y-8 animate-fade-in">
      <div class="grid md:grid-cols-3 gap-6">
        <div
          v-for="(meals, type) in mealTypes"
          :key="type"
          class="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 group hover:shadow-md transition-all relative overflow-hidden"
        >
          <!-- Decorative accent -->
          <div 
            class="absolute top-0 left-0 w-full h-1"
            :class="{
              'bg-orange-400': type === 'breakfast',
              'bg-primaryGreen': type === 'lunch',
              'bg-blue-400': type === 'dinner'
            }"
          ></div>

          <div class="flex items-center gap-3 mb-6">
            <div 
              class="w-10 h-10 rounded-xl flex items-center justify-center"
              :class="{
                'bg-orange-50 text-orange-500': type === 'breakfast',
                'bg-green-50 text-green-500': type === 'lunch',
                'bg-blue-50 text-blue-500': type === 'dinner'
              }"
            >
              <Icon :name="type === 'breakfast' ? 'heroicons:sun' : (type === 'lunch' ? 'heroicons:lightning-bolt' : 'heroicons:moon')" size="22" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 capitalize">{{ type }}</h3>
          </div>

          <ul class="space-y-4">
            <li
              v-for="(meal, index) in meals"
              :key="index"
              class="flex gap-3 text-sm text-gray-600 leading-relaxed p-3 rounded-2xl bg-gray-50/50 border border-gray-50 group-hover:bg-white group-hover:border-gray-100 transition-colors"
            >
              <span class="text-primaryGreen font-bold">•</span>
              {{ meal }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Budget Summary Card -->
      <div class="bg-secondaryGreen rounded-[2.5rem] p-8 text-white flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl shadow-secondaryGreen/20 relative overflow-hidden">
        <div class="absolute inset-0 opacity-10 pointer-events-none">
          <div class="absolute -top-12 -left-12 w-48 h-48 bg-white rounded-full blur-3xl"></div>
          <div class="absolute -bottom-12 -right-12 w-48 h-48 bg-black rounded-full blur-3xl"></div>
        </div>

        <div class="relative flex items-center gap-6">
          <div class="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
            <Icon name="heroicons-solid:chart-pie" size="32" />
          </div>
          <div class="space-y-1">
            <p class="text-white/60 text-xs font-bold uppercase tracking-widest">Financial Insight</p>
            <h4 class="text-2xl font-bold">Your Budget Summary</h4>
          </div>
        </div>

        <div class="relative flex gap-12 text-center md:text-left">
          <div class="space-y-1">
            <p class="text-white/60 text-xs font-bold uppercase tracking-widest">Average Cost</p>
            <p class="text-3xl font-bold">{{ result.averageCost }} <span class="text-sm font-normal opacity-60">{{ mealBudget.currency }}</span></p>
          </div>
          <div class="space-y-1 border-l border-white/10 pl-12">
            <p class="text-white/60 text-xs font-bold uppercase tracking-widest">Savings</p>
            <p class="text-3xl font-bold text-primaryGreen">{{ result.averageAmountLeft }} <span class="text-sm font-normal opacity-60">{{ mealBudget.currency }}</span></p>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="!loading" class="text-center py-20 animate-fade-in">
      <div class="w-24 h-24 bg-gray-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-gray-200">
        <Icon name="heroicons:currency-dollar" size="48" />
      </div>
      <h3 class="text-xl font-bold text-gray-900">No Meals Generated Yet</h3>
      <p class="text-gray-400 max-w-sm mx-auto mt-2">Enter your daily budget above and let Dr. Nutri find the best healthy meals for your budget.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { mealBudget, errors, generateMeals, error, loading, result } = useBudgetBite();

const mealTypes = computed(() => {
  if (!result.value) return null;
  const { breakfast, lunch, dinner } = result.value;
  return { breakfast, lunch, dinner };
});

useHead({
  title: "Budget Bite | Nutri-Lens",
});

definePageMeta({
  layout: "dashboard",
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.glass-morphism {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
</style>

