<template>
  <div class="w-full h-screen flex justify-between items-center" id="plans">
    <div
      class="flex flex-col gap-4 min-h-full w-full justify-center items-center"
    >
      <h1 class="text-2xl font-bold">Customize your plan</h1>
      <form class="w-4/5 grid gap-6">
        <div>
          <label for="weight">Weight</label>
          <div class="flex items-center">
            <BaseInput
              type="number"
              placeholder="60"
              v-model="factory.weight"
              :error="errors.weight as string"
            />
            <BaseSelect
              :options="['kg', 'g']"
              placeholder="kg"
              v-model="factory.weightUnit"
            />
          </div>
        </div>
        <div>
          <label for="height">Height</label>
          <div class="flex items-center">
            <BaseInput
              type="number"
              placeholder="170"
              v-model="factory.height"
              :error="errors.height as string"
            />
            <BaseSelect
              :options="['cm', 'm']"
              placeholder="cm"
              v-model="factory.heightUnit"
            />
          </div>
        </div>
        <div>
          <label for="age">Age</label>
          <BaseInput
            type="number"
            placeholder="30"
            v-model="factory.age"
            :error="errors.age as string"
          />
        </div>
        <div>
          <label for="disease"
            >Do you suffer from any diseases & allergies?</label
          >
          <div>
            <textarea
              style="resize: none"
              rows="5"
              cols="10"
              class="w-full outline-none gap-2 p-2 rounded-lg bg-lightGray flex items-center border border-primaryGreen shadow shadow-primaryGreen group-focus-within:border-primaryGreen"
              placeholder="Mention all chronic diseases and foods you are allergic to"
              v-model="factory.disease"
            ></textarea>
          </div>
        </div>
        <div class="w-full">
          <BaseButton
            customClass="!bg-secondaryGreen w-full rounded-lg"
            :loading
            :disabled="loading"
            @click="generateRecipes"
            >Let's Go</BaseButton
          >
        </div>
      </form>
    </div>
    <!-- //bg-image -->
    <div class="plan-image-container h-full w-full hidden lg:block">
      <img
        src="/public/images/plans-image.jpg"
        alt="auth-image"
        class="plan-image object-cover w-full h-full"
      />
    </div>
    <div class="fixed inset-0 w-full h-full z-[-1] lg:hidden">
      <img
        src="/public/images/top-left.svg"
        alt="under-cover"
        class="absolute top-0 left-0 w-1/2 h-1/2 object-cover"
      />
      <img
        src="/public/images/bottom-left.svg"
        alt="under-cover"
        class="absolute bottom-0 left-0 w-1/2 h-1/2 object-cover"
      />
      <img
        src="/public/images/bottom-right.svg"
        alt="under-cover"
        class="absolute bottom-0 right-0 w-1/2 h-1/2 object-cover"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Plans",
  meta: [
    {
      name: "description",
      content: "Setting up your onboarding personalised plans.",
    },
  ],
});
useSeoMeta({
  title: "Plans",
  description: "Setting up your onboarding personalised plans.",
  ogDescription: "Setting up your onboarding personalised plans.",
  ogTitle: "Plans",
  ogImage: "/images/nutri-lens.png",
});

const { factory, errors, generateRecipes, loading } = useGenerateRecipes();
</script>

<style scoped>
@media screen and (min-width: 1024px) {
  #plans {
    background-image: url("/public/images/bg.svg");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    height: 100vh;
    min-width: 100%;
  }
}
</style>
