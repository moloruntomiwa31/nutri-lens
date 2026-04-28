<template>
  <div class="max-w-4xl mx-auto space-y-8 pb-12 animate-fade-in">
    <!-- Header -->
    <div class="text-center space-y-2">
      <BaseHeading as="h1" size="2xl" weight="bold" class="text-gray-900">Meal Analyzer</BaseHeading>
      <BaseText class="text-gray-500 text-lg">Snap your meal to unlock detailed nutritional insights instantly.</BaseText>
    </div>

    <!-- Redesigned Stepper -->
    <div class="flex items-center justify-center max-w-lg mx-auto">
      <template v-for="(step, index) in steps" :key="step.id">
        <div class="flex items-center flex-1">
          <div 
            class="flex flex-col items-center gap-2 group cursor-pointer"
            @click="setCurrentStep(step)"
          >
            <div 
              class="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 border-2"
              :class="[
                step.done 
                  ? 'bg-primaryGreen border-primaryGreen text-white shadow-lg shadow-primaryGreen/20' 
                  : (currentStep.id === step.id ? 'bg-white border-primaryGreen text-primaryGreen shadow-xl' : 'bg-white border-gray-100 text-gray-300')
              ]"
            >
              <Icon v-if="step.done" name="lets-icons:check-fill" size="24" />
              <span v-else class="font-bold">{{ index + 1 }}</span>
            </div>
            <span 
              class="text-xs font-bold uppercase tracking-widest hidden md:block"
              :class="currentStep.id === step.id ? 'text-gray-900' : 'text-gray-400'"
            >
              {{ step.name }}
            </span>
          </div>
          <div 
            v-if="index < steps.length - 1" 
            class="flex-1 h-0.5 mx-4 rounded-full transition-colors duration-300"
            :class="step.done ? 'bg-primaryGreen' : 'bg-gray-100'"
          ></div>
        </div>
      </template>
    </div>

    <!-- Content Area -->
    <div class="glass-morphism rounded-[3rem] p-8 md:p-12 border border-white/50 shadow-2xl shadow-black/5 min-h-[400px] flex flex-col">
      
      <!-- Upload Step -->
      <div v-if="currentStep.detail === 'upload'" class="flex-1 flex flex-col items-center justify-center space-y-8 animate-fade-in">
        <div class="w-full max-w-md relative group">
          <div class="absolute -inset-1 bg-gradient-to-r from-primaryGreen to-secondaryGreen rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div class="relative bg-white border-2 border-dashed border-gray-100 rounded-[2.5rem] p-12 flex flex-col items-center justify-center gap-4 hover:border-primaryGreen transition-colors cursor-pointer group-hover:shadow-xl">
            <BaseFileInput
              accept="image/*"
              @update:modelValue="handleImageSelection"
              class="absolute inset-0 opacity-0 cursor-pointer z-10"
            />
            <div class="w-20 h-20 rounded-3xl bg-primaryGreen/10 flex items-center justify-center text-primaryGreen group-hover:scale-110 transition-transform">
              <Icon name="heroicons:camera" size="40" />
            </div>
            <div class="text-center">
              <p class="font-bold text-gray-900">Upload Meal Image</p>
              <p class="text-sm text-gray-400">PNG, JPG up to 10MB</p>
            </div>
          </div>
        </div>

        <div v-if="imageUrl" class="relative animate-scale-in">
          <img
            :src="imageUrl"
            alt="Preview"
            class="rounded-3xl h-64 w-64 object-cover shadow-2xl ring-4 ring-white"
          />
          <button 
            @click="resetAnalyzer"
            class="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-xl shadow-lg border border-gray-100 flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors"
          >
            <Icon name="heroicons:x" size="20" />
          </button>
        </div>

        <BaseButton
          v-if="imageUrl"
          customClass="px-12 py-4 rounded-2xl bg-secondaryGreen shadow-xl shadow-secondaryGreen/20 transform hover:scale-105 active:scale-95 transition-all text-lg font-bold"
          :disabled="!canProceedToNext || isLoading"
          :loading="isLoading"
          @click="() => image && analyzeMeal(image)"
        >
          {{ isLoading ? "Analyzing..." : "Analyze Nutrition" }}
        </BaseButton>

        <div v-if="error" class="bg-red-50 text-primaryRed p-4 rounded-2xl border border-red-100 text-sm font-medium">
          {{ error }}
        </div>
      </div>

      <!-- Result Step -->
      <div v-if="currentStep.detail === 'result' && result" class="space-y-10 animate-fade-in">
        <div class="flex items-center justify-between border-b border-gray-100 pb-6">
          <BaseHeading as="h2" weight="bold" size="xl" class="text-gray-900 after:hidden !mb-0">Nutritional Breakdown</BaseHeading>
          <BaseButton color="transparent" customClass="text-secondaryGreen font-bold" @click="resetAnalyzer">
            Analyze New <Icon name="heroicons:plus" class="ml-1" />
          </BaseButton>
        </div>

        <!-- Macro Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div v-for="(value, key) in nutritionData" :key="key" class="bg-white rounded-3xl p-6 shadow-sm border border-gray-50 flex flex-col items-center text-center group hover:shadow-md transition-all">
            <div 
              class="w-10 h-10 rounded-xl mb-4 flex items-center justify-center transition-colors"
              :class="{
                'bg-orange-50 text-orange-500': key === 'calories',
                'bg-blue-50 text-blue-500': key === 'protein',
                'bg-green-50 text-green-500': key === 'carbs',
                'bg-yellow-50 text-yellow-500': key === 'fat'
              }"
            >
              <Icon :name="key === 'calories' ? 'heroicons:lightning-bolt' : (key === 'protein' ? 'heroicons:fire' : (key === 'carbs' ? 'heroicons:cake' : 'heroicons:color-swatch'))" size="20" />
            </div>
            <span class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{{ key }}</span>
            <span class="text-xl font-bold text-gray-900">{{ value }}</span>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <!-- Ingredients -->
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <Icon name="heroicons-solid:book-open" class="text-primaryGreen" />
              <h3 class="font-bold text-gray-900">Detected Ingredients</h3>
            </div>
            <ul class="grid grid-cols-1 gap-2">
              <li v-for="item in result.ingredients" :key="item" class="flex items-center gap-3 p-3 rounded-2xl bg-gray-50/50 text-sm text-gray-600 border border-gray-50">
                <div class="w-1.5 h-1.5 rounded-full bg-primaryGreen"></div>
                {{ item }}
              </li>
            </ul>
          </div>

          <!-- Benefits & Recs -->
          <div class="space-y-6">
            <div class="bg-primaryGreen/5 rounded-3xl p-6 border border-primaryGreen/10 space-y-3">
              <div class="flex items-center gap-2 text-primaryGreen">
                <Icon name="heroicons-solid:sparkles" size="18" />
                <span class="font-bold text-sm uppercase tracking-wider">Health Benefits</span>
              </div>
              <p class="text-sm text-secondaryGreen leading-relaxed">{{ result.healthBenefits }}</p>
            </div>

            <div class="bg-blue-50 rounded-3xl p-6 border border-blue-100 space-y-3">
              <div class="flex items-center gap-2 text-blue-500">
                <Icon name="heroicons-solid:light-bulb" size="18" />
                <span class="font-bold text-sm uppercase tracking-wider">Recommendation</span>
              </div>
              <p class="text-sm text-blue-900/70 leading-relaxed">{{ result.recommendation }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
    calories: `${result.value.calories} kcal`,
    protein: `${result.value.protein}g`,
    carbs: `${result.value.carbs}g`,
    fat: `${result.value.fat}g`,
  };
});

useHead({
  title: "Meal Analyzer | Nutri-Lens",
});

definePageMeta({
  layout: "dashboard",
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

.animate-scale-in {
  animation: scaleIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

.glass-morphism {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
</style>

