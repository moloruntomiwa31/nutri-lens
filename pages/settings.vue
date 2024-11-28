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
              :readonly="true"
            />
            <!-- <div class="flex justify-end">
              <BaseButton customClass="rounded-lg">Save</BaseButton>
            </div> -->
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
                    v-model="health.weight"
                  />
                  <BaseSelect
                    :options="['kg', 'g']"
                    :placeholder="health.weightUnit"
                  />
                </div>
              </div>
              <div class="bg-lightGray p-2 rounded-lg shadow">
                <BaseText as="label" weight="medium">Height</BaseText>
                <div class="flex items-center">
                  <BaseInput
                    type="number"
                    placeholder="170"
                    v-model="health.height"
                  />
                  <BaseSelect
                    :options="['cm', 'm']"
                    :placeholder="health.heightUnit"
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
                  v-model="health.age"
                />
              </div>
              <div class="bg-lightGray p-2 rounded-lg shadow">
                <BaseText as="label" weight="medium"
                  >Diseases & Allergies</BaseText
                >
                <div>
                  <textarea
                    style="resize: none"
                    rows="5"
                    cols="10"
                    class="w-full outline-none gap-2 p-2 rounded-lg bg-lightGray flex items-center border border-primaryGreen shadow shadow-primaryGreen group-focus-within:border-primaryGreen"
                    placeholder="Mention all chronic diseases and foods you are allergic to"
                    v-model="health.disease"
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="w-full flex items-end justify-center">
              <BaseButton
                @click="handleSubmit"
                :loading
                :disabled="loading"
                customClass="w-full rounded-lg"
                >Save</BaseButton
              >
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

import { doc, getDoc } from "firebase/firestore";
import type UserHealth from "~/types/UserHealth";
const { isDesktopScreen } = useScreenObserver();
const { generateRecipes, loading } = useGenerateRecipes();
const { addToast } = useToast();
const { user } = useAuth();
const firstName = ref(user.value?.displayName?.split(" ")[0]);
const lastName = ref(user.value?.displayName?.split(" ").slice(1).join(" "));
const emailAddress = user.value?.email || "";
const health = ref<UserHealth>({
  weight: "",
  weightUnit: "kg",
  height: "",
  heightUnit: "cm",
  age: "",
  disease: "",
  gender: "",
});
const { uploadImage, avatarImageUrl } = useProfile();
const { $firebase } = useNuxtApp();
const db = $firebase.db;
if (user.value) {
  const userRef = doc(db, "users", user.value.uid);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists() && userDoc.data().firstName && userDoc.data().lastName) {
    firstName.value = userDoc.data().firstName;
    lastName.value = userDoc.data().lastName;
  }
  if (userDoc.exists() && userDoc.data().health) {
    health.value = userDoc.data().health;
  }
}
const handleSubmit = async () => {
  try {
    await generateRecipes(health.value);
    addToast("Plans updated successfully", "success");
  } catch (err) {
    addToast("Failed to update plans", "error");
  }
};
</script>
