<template>
  <div class="max-w-4xl mx-auto space-y-8 pb-12 animate-fade-in">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <BaseHeading size="2xl" weight="bold" as="h1" class="text-gray-900">Account Settings</BaseHeading>
        <BaseText class="text-gray-500">Manage your profile and nutritional preferences</BaseText>
      </div>
      <BaseButton 
        @click="handleSubmit" 
        :loading="loading" 
        customClass="rounded-2xl px-8 py-3 bg-secondaryGreen shadow-lg shadow-secondaryGreen/20"
      >
        Save Changes
      </BaseButton>
    </div>

    <div class="grid lg:grid-cols-3 gap-8">
      <!-- Left Column: Avatar & Quick Info -->
      <div class="lg:col-span-1 space-y-6">
        <div class="glass-morphism rounded-[2.5rem] p-8 border border-white/40 text-center">
          <div class="relative inline-block group">
            <div class="w-32 h-32 rounded-3xl overflow-hidden ring-4 ring-white shadow-xl transition-transform group-hover:scale-105">
              <img 
                v-if="avatarImageUrl" 
                :src="avatarImageUrl" 
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full bg-primaryGreen flex items-center justify-center">
                <Icon name="gg:profile" size="64" class="text-white" />
              </div>
            </div>
            <BaseFileInput 
              accept=".jpg, .png" 
              @update:modelValue="uploadImage"
              class="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors border border-gray-100"
            >
              <Icon name="flowbite:upload-outline" size="20" class="text-secondaryGreen" />
            </BaseFileInput>
          </div>
          
          <div class="mt-6 space-y-1">
            <h3 class="font-bold text-gray-900 text-lg">{{ firstName }} {{ lastName }}</h3>
            <p class="text-sm text-gray-500">{{ emailAddress }}</p>
          </div>
        </div>

        <div class="bg-primaryGreen/10 rounded-[2rem] p-6 border border-primaryGreen/10">
          <div class="flex items-center gap-3 mb-2 text-primaryGreen">
            <Icon name="heroicons-solid:sparkles" size="20" />
            <span class="font-bold text-sm uppercase tracking-wider">Health Tip</span>
          </div>
          <p class="text-sm text-secondaryGreen leading-relaxed">
            Keep your weight and height up to date to ensure the AI provides the most accurate nutritional analysis for your body type.
          </p>
        </div>
      </div>

      <!-- Right Column: Forms -->
      <div class="lg:col-span-2 space-y-8">
        <!-- Profile Info -->
        <div class="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 space-y-6">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-secondaryGreen/10 flex items-center justify-center">
              <Icon name="heroicons-solid:user" class="text-secondaryGreen" />
            </div>
            <h2 class="text-xl font-bold text-gray-900">Personal Information</h2>
          </div>
          
          <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <BaseText as="label" weight="medium" class="text-xs text-gray-400 uppercase tracking-widest ml-1">First Name</BaseText>
              <BaseInput v-model="firstName" placeholder="First Name" class="rounded-2xl border-gray-100" />
            </div>
            <div class="space-y-2">
              <BaseText as="label" weight="medium" class="text-xs text-gray-400 uppercase tracking-widest ml-1">Last Name</BaseText>
              <BaseInput v-model="lastName" placeholder="Last Name" class="rounded-2xl border-gray-100" />
            </div>
          </div>
          
          <div class="space-y-2">
            <BaseText as="label" weight="medium" class="text-xs text-gray-400 uppercase tracking-widest ml-1">Email Address (Read-only)</BaseText>
            <BaseInput v-model="emailAddress" :readonly="true" class="rounded-2xl border-gray-100 bg-gray-50 text-gray-400" />
          </div>
        </div>

        <!-- Health & Metrics -->
        <div class="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 space-y-6">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-primaryGreen/10 flex items-center justify-center">
              <Icon name="heroicons-solid:heart" class="text-primaryGreen" />
            </div>
            <h2 class="text-xl font-bold text-gray-900">Health Metrics</h2>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <BaseText as="label" weight="medium" class="text-xs text-gray-400 uppercase tracking-widest ml-1">Weight</BaseText>
              <div class="flex gap-2">
                <BaseInput v-model="health.weight" type="number" placeholder="60" class="rounded-2xl border-gray-100 flex-1" />
                <BaseSelect :options="['kg', 'g']" v-model="health.weightUnit" class="rounded-2xl border-gray-100 !w-24" />
              </div>
            </div>
            <div class="space-y-2">
              <BaseText as="label" weight="medium" class="text-xs text-gray-400 uppercase tracking-widest ml-1">Height</BaseText>
              <div class="flex gap-2">
                <BaseInput v-model="health.height" type="number" placeholder="170" class="rounded-2xl border-gray-100 flex-1" />
                <BaseSelect :options="['cm', 'm']" v-model="health.heightUnit" class="rounded-2xl border-gray-100 !w-24" />
              </div>
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <BaseText as="label" weight="medium" class="text-xs text-gray-400 uppercase tracking-widest ml-1">Age</BaseText>
              <BaseInput v-model="health.age" type="number" placeholder="30" class="rounded-2xl border-gray-100" />
            </div>
            <div class="space-y-2">
              <BaseText as="label" weight="medium" class="text-xs text-gray-400 uppercase tracking-widest ml-1">Gender</BaseText>
              <BaseSelect :options="['Male', 'Female', 'Others']" v-model="health.gender" class="rounded-2xl border-gray-100" />
            </div>
          </div>

          <div class="space-y-2">
            <BaseText as="label" weight="medium" class="text-xs text-gray-400 uppercase tracking-widest ml-1">Diseases & Allergies</BaseText>
            <textarea
              v-model="health.disease"
              rows="4"
              class="w-full outline-none p-4 rounded-3xl bg-gray-50 border border-gray-100 focus:border-primaryGreen transition-all shadow-sm placeholder:text-gray-300 resize-none"
              placeholder="Mention all chronic diseases and foods you are allergic to"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { doc, getDoc } from "firebase/firestore";
import type UserHealth from "~/types/UserHealth";

const { isDesktopScreen } = useScreenObserver();
const { generateRecipes, loading } = useGenerateRecipes();
const { addToast } = useToast();
const { user } = useAuth();
const { uploadImage, avatarImageUrl } = useProfile();
const { $firebase } = useNuxtApp();

const firstName = ref(user.value?.displayName?.split(" ")[0] || "");
const lastName = ref(user.value?.displayName?.split(" ").slice(1).join(" ") || "");
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

const db = $firebase.db;

onMounted(async () => {
  if (user.value) {
    const userRef = doc(db, "users", user.value.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const data = userDoc.data();
      if (data.firstName) firstName.value = data.firstName;
      if (data.lastName) lastName.value = data.lastName;
      if (data.health) health.value = data.health;
    }
  }
});

const handleSubmit = async () => {
  try {
    await generateRecipes(health.value);
    addToast("Preferences updated successfully", "success");
  } catch (err) {
    addToast("Failed to update preferences", "error");
  }
};

useHead({
  title: "Settings | Nutri-Lens",
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

