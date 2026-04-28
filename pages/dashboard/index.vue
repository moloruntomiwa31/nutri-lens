<template>
  <div class="space-y-12 pb-12 animate-fade-in">
    <!-- Hero / Recipe of the Day -->
    <section class="relative group overflow-hidden rounded-[3rem] shadow-2xl shadow-black/10 transition-all duration-500 hover:shadow-black/20">
      <div class="h-[500px] w-full relative overflow-hidden">
        <img
          v-if="!recipe.image"
          src="/images/mom-eating.jpg"
          alt="Featured healthy meal"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <NuxtImg
          v-else
          :src="recipe.image"
          alt="Recipe of the day"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <!-- Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
      </div>

      <!-- Content Overlay -->
      <div class="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white space-y-6">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primaryGreen text-white text-xs font-bold uppercase tracking-widest animate-bounce">
          <Icon name="heroicons-solid:star" size="14" />
          Recipe of the Day
        </div>

        <div v-if="recipe.name" class="space-y-4 max-w-3xl">
          <BaseHeading as="h2" size="4xl" weight="bold" class="text-white after:hidden !mb-0 leading-tight">
            {{ recipe.name }}
          </BaseHeading>
          <p class="text-white/80 text-lg line-clamp-2 leading-relaxed">
            {{ recipe.description }}
          </p>
        </div>
        <div v-else class="space-y-4">
          <BaseHeading as="h2" size="4xl" weight="bold" class="text-white after:hidden !mb-0">
            Fuel Your Body Right
          </BaseHeading>
          <p class="text-white/70 text-lg">
            Discover a world of AI-curated nutrition tailored just for you.
          </p>
        </div>

        <!-- Stats Grid -->
        <div v-if="recipe.calories" class="flex flex-wrap items-center gap-8 pt-4 border-t border-white/10">
          <div class="flex flex-col">
            <span class="text-white/50 text-xs font-bold uppercase tracking-wider">Calories</span>
            <span class="text-xl font-bold">{{ recipe.calories }} <span class="text-xs font-normal opacity-60">kcal</span></span>
          </div>
          <div class="flex flex-col border-l border-white/10 pl-8">
            <span class="text-white/50 text-xs font-bold uppercase tracking-wider">Protein</span>
            <span class="text-xl font-bold">{{ recipe.protein }}</span>
          </div>
          <div class="flex flex-col border-l border-white/10 pl-8">
            <span class="text-white/50 text-xs font-bold uppercase tracking-wider">Carbs</span>
            <span class="text-xl font-bold">{{ recipe.carbs }}</span>
          </div>
          <div class="flex flex-col border-l border-white/10 pl-8">
            <span class="text-white/50 text-xs font-bold uppercase tracking-wider">Rating</span>
            <div class="flex items-center gap-1">
              <StarRating :rating="recipe.rating" textColor="text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Recipes Carousel -->
    <section class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <BaseHeading as="h2" size="2xl" weight="bold" class="text-gray-900 after:hidden !mb-1">
            Personalized Recipes
          </BaseHeading>
          <p class="text-gray-500 text-sm">Delicious meals based on your unique health profile</p>
        </div>
        <button class="text-secondaryGreen font-bold text-sm hover:underline flex items-center gap-2 group">
          View all <Icon name="heroicons:arrow-right" class="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div class="relative">
        <!-- Blur overlays for carousel edges -->
        <div class="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-light-bg to-transparent z-10 pointer-events-none"></div>
        <div class="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-light-bg to-transparent z-10 pointer-events-none"></div>

        <div class="flex items-stretch gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide px-4">
          <DashboardRecipeCard
            v-if="recipes.length > 0"
            v-for="recipe in recipes"
            :key="recipe.id"
            :recipe="recipe"
            class="snap-start flex-shrink-0 w-72 md:w-80"
          />
          <DashboardEmptyState
            v-else
            v-for="i in 4"
            :key="i"
            class="snap-start flex-shrink-0 w-72 md:w-80"
          />
        </div>
      </div>
    </section>

    <!-- Quick Insights -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all group">
        <div class="w-12 h-12 rounded-2xl bg-primaryGreen/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <Icon name="heroicons:lightning-bolt" class="text-primaryGreen" size="24" />
        </div>
        <h3 class="text-lg font-bold text-gray-900 mb-2">Instant Analysis</h3>
        <p class="text-sm text-gray-500 leading-relaxed">Snapshot your meal and get immediate nutritional breakdown using our advanced Gemini AI.</p>
      </div>

      <div class="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all group">
        <div class="w-12 h-12 rounded-2xl bg-secondaryGreen/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <Icon name="heroicons:currency-dollar" class="text-secondaryGreen" size="24" />
        </div>
        <h3 class="text-lg font-bold text-gray-900 mb-2">Budget Optimized</h3>
        <p class="text-sm text-gray-500 leading-relaxed">Eat healthy without breaking the bank. Our budget bite tool finds the best meals for your wallet.</p>
      </div>

      <div class="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all group">
        <div class="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <Icon name="heroicons:chat-alt-2" class="text-blue-500" size="24" />
        </div>
        <h3 class="text-lg font-bold text-gray-900 mb-2">AI Health Chat</h3>
        <p class="text-sm text-gray-500 leading-relaxed">Have a question? Dr. Nutri is available 24/7 to provide expert guidance on your health journey.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { recipes } = useGenerateRecipes();
const { recipe, generateRecipeOfTheDay } = useRecipeOfTheDay();

onMounted(async () => {
  await generateRecipeOfTheDay();
});

useHead({
  title: "Dashboard | Nutri-Lens",
});

definePageMeta({
  layout: "dashboard",
});
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>


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
