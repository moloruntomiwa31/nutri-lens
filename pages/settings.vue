<template>
  <div class="flex items-center justify-center h-full mt-4">
    <div
      class="bg-grayColor rounded-lg w-4/5 md:w-[600px] lg:w-[700px] xl:w-[800px] p-6"
    >
      <div class="profile-update">
        <BaseHeading size="2xl" weight="bold" as="h2">Profile Info</BaseHeading>
        <div
          class="flex flex-col md:flex-row items-center lg:items-start justify-center md:justify-between gap-4 py-2"
        >
          <div
            class="flex items-center justify-center w-[200px] h-[200px] bg-lightGray shadow rounded-full relative text-secondaryGreen"
          >
            <BaseFileInput accept=".jpg, .png" @update:modelValue="uploadImage">
              <BaseText as="span" v-if="!avatarImageUrl">
                <Icon
                  name="gg:profile"
                  :size="isDesktopScreen ? '150' : '100'"
                />
              </BaseText>
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
          <BaseHeading size="2xl" weight="bold" as="h2"
            >Update Plans</BaseHeading
          >
          <form class="w-full grid gap-6">
            <div class="grid md:grid-cols-2 gap-4">
              <div class="bg-lightGray p-2 rounded-lg shadow">
                <BaseText as="label" weight="medium">Weight</BaseText>
                <div class="flex items-center">
                  <BaseInput
                    type="number"
                    placeholder="60"
                    v-model="factory.weight"
                  />
                  <BaseSelect
                    :options="['kg', 'g']"
                    :placeholder="factory.weightUnit"
                  />
                </div>
              </div>
              <div class="bg-lightGray p-2 rounded-lg shadow">
                <BaseText as="label" weight="medium">Height</BaseText>
                <div class="flex items-center">
                  <BaseInput
                    type="number"
                    placeholder="170"
                    v-model="factory.height"
                  />
                  <BaseSelect
                    :options="['cm', 'm']"
                    :placeholder="factory.heightUnit"
                  />
                </div>
              </div>
            </div>
            <div class="grid md:grid-cols-2 gap-4">
              <div class="bg-lightGray p-2 rounded-lg shadow">
                <BaseText as="label" weight="medium">Age</BaseText>
                <BaseInput
                  type="number"
                  placeholder="30"
                  v-model="factory.age"
                />
              </div>
              <div class="w-full flex items-end justify-center">
                <BaseButton
                  @click="handleSubmit"
                  :loading="loading"
                  :disabled="loading"
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
const { factory, generateRecipes, loading } = useGenerateRecipes();
const { addToast } = useToast();
const { currentUser } = useAuth();
const firstName = currentUser?.displayName?.split(" ")[0] || "";
const lastName = currentUser?.displayName?.split(" ").slice(1).join(" ") || "";
const emailAddress = currentUser?.email || "";
const { uploadImage, avatarImageUrl } = useProfile();

const handleSubmit = async () => {
  try {
    await generateRecipes(factory);
    addToast("Plans updated successfully", "success");
  } catch (err) {
    addToast("Failed to update plans", "error");
  }
};
</script>
