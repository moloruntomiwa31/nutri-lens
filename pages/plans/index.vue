<template>
  <div class="w-full min-h-screen flex justify-between items-center" id="plans">
    <div
      class="flex flex-col gap-1 min-h-full w-full justify-center items-center"
    >
      <BaseHeading as="h1" size="2xl">Customize your plan</BaseHeading>
      <form class="w-4/5 grid gap-6 lg:gap-3">
        <div>
          <BaseText as="label" weight="medium">Weight</BaseText>
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
          <BaseText as="label" weight="medium">Height</BaseText>
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
          <BaseText as="label" weight="medium">Age</BaseText>
          <BaseInput
            type="number"
            placeholder="30"
            v-model="factory.age"
            :error="errors.age as string"
          />
        </div>
        <div>
          <BaseText as="label" weight="medium">Gender</BaseText>
          <BaseSelect
            customClass="!mx-0"
            :options="['Male', 'Female', 'Others']"
            placeholder="Male"
            v-model="factory.gender"
            :showArrow="false"
          />
        </div>
        <div>
          <BaseText as="label" weight="medium"
            >Do you suffer from any diseases & allergies?</BaseText
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
            <BaseText
              customClass="text-primaryRed"
              size="sm"
              v-if="factory.disease"
            >
              {{ errors.disease }}
            </BaseText>
          </div>
        </div>
        <div v-if="error" class="transition duration-150">
          <BaseText customClass="text-primaryRed" size="sm">
            {{ error }}
          </BaseText>
        </div>
        <div class="w-full">
          <BaseButton
            customClass="!bg-secondaryGreen w-full rounded-lg"
            :loading="loading"
            @click="handleSubmit"
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
const { factory, errors, generateRecipes, loading, error } =
  useGenerateRecipes();

const handleSubmit = async () => {
  await generateRecipes(factory);
};
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
