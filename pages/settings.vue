<template>
  <div class="flex items-center justify-center h-full mt-4">
    <div
      class="bg-grayColor rounded-lg w-4/5 md:w-[600px] lg:w-[700px] xl:w-[800px] p-6"
    >
      <div class="profile-update">
        <h2 class="text-2xl font-bold">Profile Info</h2>
        <div
          class="flex flex-col md:flex-row items-center lg:items-start justify-center md:justify-between gap-4 py-2"
        >
          <div
            class="flex items-center justify-center w-[200px] h-[200px] bg-lightGray shadow rounded-full relative text-secondaryGreen"
          >
            <BaseFileInput accept=".jpg, .png" @update:modelValue="uploadImage">
              <span v-if="!avatarImageUrl">
                <Icon
                  name="gg:profile"
                  :size="isDesktopScreen ? '150' : '100'"
                />
              </span>
              <Avatar size="5xl" v-if="avatarImageUrl">
                <AvatarImage
                  :src="avatarImageUrl"
                  customClass="rounded-full w-full h-full object-cover"
                />
              </Avatar>
              <Icon
                name="flowbite:upload-outline"
                size="30"
                class="absolute bottom-8 right-4"
              />
            </BaseFileInput>
          </div>
          <div class="grow space-y-8">
            <BaseInput placeholder="First-Name" v-model="firstName" />
            <BaseInput placeholder="Last-name" v-model="lastName" />
            <BaseInput
              type="email"
              placeholder="Email Address"
              v-model="emailAddress"
            />
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
                  <BaseInput type="number" placeholder="60" v-model="weight" />
                  <BaseSelect
                    :options="['kg', 'g']"
                    :placeholder="weightUnit"
                  />
                </div>
              </div>
              <div class="bg-lightGray p-2 rounded-lg shadow">
                <label for="height">Height</label>
                <div class="flex items-center">
                  <BaseInput type="number" placeholder="170" v-model="height" />
                  <BaseSelect
                    :options="['cm', 'm']"
                    :placeholder="heightUnit"
                  />
                </div>
              </div>
            </div>
            <div class="grid md:grid-cols-2 gap-4">
              <div class="bg-lightGray p-2 rounded-lg shadow">
                <label for="age">Age</label>
                <BaseInput type="number" placeholder="30" v-model="age" />
              </div>
              <div class="w-full flex items-end justify-center">
                <BaseButton
                  @click="generateRecipes"
                  customClass="w-full rounded-lg"
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
useHead({
  title: "Settings",
  meta: [
    {
      name: "description",
      content: "Update your profile and plans.",
    },
  ],
});
useSeoMeta({
  title: "Settings",
  description: "Update your profile and plans.",
  ogDescription: "Update your profile and plans.",
  ogTitle: "Settings",
  ogImage: "/images/nutri-lens.png",
});
definePageMeta({
  layout: "dashboard",
});

const { isDesktopScreen } = useScreenObserver();
const { factory, generateRecipes } = useGenerateRecipes();
const { user } = useAuth();
const weight = computed(() => factory.weight);
const height = computed(() => factory.height);
const age = computed(() => factory.age);
const weightUnit = computed(() => factory.weightUnit);
const heightUnit = computed(() => factory.heightUnit);
const firstName = user?.displayName?.split(" ")[0] || "";
const lastName = user?.displayName?.split(" ").slice(1).join(" ") || "";
const emailAddress = user?.email || "";
const { uploadImage, avatarImageUrl } = useProfile();
</script>
