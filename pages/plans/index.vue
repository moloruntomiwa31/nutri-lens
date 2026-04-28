<template>
  <div class="min-h-screen w-full relative flex items-center justify-center p-6 overflow-hidden bg-light-bg">
    <!-- Premium Background Image -->
    <div class="absolute inset-0 z-0">
      <img
        src="/images/revamp/onboarding-bg.png"
        alt="Onboarding background"
        class="w-full h-full object-cover opacity-50 scale-105"
      />
      <div class="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-white/60"></div>
    </div>

    <!-- Content Card -->
    <main class="relative z-10 w-full max-w-2xl">
      <div class="mb-8 text-center animate-fade-in-up">
        <BaseHeading as="h1" size="2xl" weight="bold" class="text-gray-900 mb-2">Personalize Your Journey</BaseHeading>
        <BaseText size="lg" class="text-gray-600">Tell us a bit about yourself so we can tailor your experience.</BaseText>
      </div>

      <div class="glass-morphism rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-black/5 border border-white/50 backdrop-blur-3xl animate-fade-in">
        <form @submit.prevent="handleSubmit" class="space-y-8">
          <div class="grid md:grid-cols-2 gap-6">
            <!-- Weight -->
            <div class="space-y-2">
              <BaseText as="label" weight="medium" class="text-sm text-gray-700 ml-1">Weight</BaseText>
              <div class="flex gap-2">
                <BaseInput
                  type="number"
                  placeholder="60"
                  v-model="factory.weight"
                  :error="errors.weight as string"
                  class="rounded-2xl border-gray-100 flex-1"
                />
                <BaseSelect
                  :options="['kg', 'g']"
                  placeholder="kg"
                  v-model="factory.weightUnit"
                  class="!w-24 rounded-2xl border-gray-100"
                />
              </div>
            </div>

            <!-- Height -->
            <div class="space-y-2">
              <BaseText as="label" weight="medium" class="text-sm text-gray-700 ml-1">Height</BaseText>
              <div class="flex gap-2">
                <BaseInput
                  type="number"
                  placeholder="170"
                  v-model="factory.height"
                  :error="errors.height as string"
                  class="rounded-2xl border-gray-100 flex-1"
                />
                <BaseSelect
                  :options="['cm', 'm']"
                  placeholder="cm"
                  v-model="factory.heightUnit"
                  class="!w-24 rounded-2xl border-gray-100"
                />
              </div>
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <!-- Age -->
            <div class="space-y-2">
              <BaseText as="label" weight="medium" class="text-sm text-gray-700 ml-1">Age</BaseText>
              <BaseInput
                type="number"
                placeholder="25"
                v-model="factory.age"
                :error="errors.age as string"
                class="rounded-2xl border-gray-100"
              />
            </div>

            <!-- Gender -->
            <div class="space-y-2">
              <BaseText as="label" weight="medium" class="text-sm text-gray-700 ml-1">Gender</BaseText>
              <BaseSelect
                :options="['Male', 'Female', 'Others']"
                placeholder="Select Gender"
                v-model="factory.gender"
                class="rounded-2xl border-gray-100"
              />
            </div>
          </div>

          <!-- Diseases/Allergies -->
          <div class="space-y-2">
            <BaseText as="label" weight="medium" class="text-sm text-gray-700 ml-1">Diseases & Allergies</BaseText>
            <textarea
              rows="4"
              class="w-full outline-none p-4 rounded-[2rem] bg-white/50 border border-gray-100 focus:border-primaryGreen transition-all shadow-sm placeholder:text-gray-300 resize-none"
              placeholder="e.g. Diabetes, Nut allergies, etc."
              v-model="factory.disease"
            ></textarea>
            <BaseText
              class="text-primaryRed text-xs ml-2"
              v-if="factory.disease && errors.disease"
            >
              {{ errors.disease }}
            </BaseText>
          </div>

          <div v-if="error" class="bg-red-50 p-4 rounded-2xl border border-red-100 animate-shake">
            <BaseText class="text-primaryRed text-sm text-center">
              {{ error }}
            </BaseText>
          </div>

          <BaseButton
            type="submit"
            customClass="w-full rounded-[2rem] py-5 bg-secondaryGreen hover:bg-secondaryGreen/90 text-lg shadow-xl shadow-secondaryGreen/20 transform active:scale-[0.98] transition-all"
            :loading="loading"
          >
            Start Your Transformation
          </BaseButton>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const { factory, errors, generateRecipes, loading, error } = useGenerateRecipes();

const handleSubmit = async () => {
  await generateRecipes(factory);
};

useHead({
  title: "Customize Your Plan | Nutri-Lens",
});

useSeoMeta({
  title: "Customize Your Plan | Nutri-Lens",
  description: "Set up your personalized health profile and start your nutrition journey.",
});

definePageMeta({
  layout: false, // Using the custom centered design for onboarding
});
</script>

<style scoped>
.glass-morphism {
  background: rgba(255, 255, 255, 0.6);
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}
.animate-shake {
  animation: shake 0.4s ease-in-out;
}
</style>

