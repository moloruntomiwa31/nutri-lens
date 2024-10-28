<template>
  <div class="flex items-center justify-center h-full mt-4">
    <div
      class="bg-grayColor rounded-lg w-4/5 md:w-[600px] lg:w-[700px] xl:w-[800px] p-6"
    >
      <div class="profile-update">
        <h2 class="text-2xl font-bold">Profile Info</h2>
        <div
          class="flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 py-2"
        >
          <div
            class="flex items-center justify-center w-[250px] h-[250px] bg-lightGray shadow rounded-full relative text-secondaryGreen"
          >
            <BaseFileInput accept="image/" @update:modelValue="">
              <span>
                <Icon
                  name="gg:profile"
                  :size="isDesktopScreen ? '170' : '140'"
                />
                <Icon
                  name="flowbite:upload-outline"
                  size="30"
                  class="absolute bottom-8 right-4"
                />
              </span>
            </BaseFileInput>
          </div>
          <div class="grow space-y-8">
            <BaseInput placeholder="First-Name" />
            <BaseInput placeholder="Last-name" />
            <BaseInput type="email" placeholder="Email Address" />
            <div class="flex justify-end">
              <BaseButton customClass="rounded-lg">Save</BaseButton>
            </div>
          </div>
        </div>
        <div class="plans-update">
          <h2 class="text-2xl font-bold">Update Plans</h2>
          <form class="w-full grid gap-6">
            <div class="grid md:grid-cols-2 gap-4">
              <div class="bg-lightGray p-2 rounded-lg shadow">
                <label for="weight">Weight</label>
                <div class="flex items-center">
                  <BaseInput type="number" placeholder="60" />
                  <BaseSelect :options="['kg', 'g']" placeholder="kg" />
                </div>
              </div>
              <div class="bg-lightGray p-2 rounded-lg shadow">
                <label for="height">Height</label>
                <div class="flex items-center">
                  <BaseInput type="number" placeholder="170" />
                  <BaseSelect :options="['cm', 'm']" placeholder="cm" />
                </div>
              </div>
            </div>
            <div class="grid md:grid-cols-2 gap-4">
              <div class="bg-lightGray p-2 rounded-lg shadow">
                <label for="age">Age</label>
                <BaseInput type="number" placeholder="30" />
              </div>
              <div class="w-full flex items-end justify-center">
                <BaseButton type="submit" customClass="w-full rounded-lg"
                  >Save</BaseButton
                >
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});
const { isDesktopScreen } = useScreenObserver();
const { factory } = useGenerateRecipes();
</script>
