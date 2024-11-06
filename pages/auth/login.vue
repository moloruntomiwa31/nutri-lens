<template>
  <div class="flex flex-col h-full w-full justify-center items-center">
    <h1 class="text-2xl font-bold">Log In</h1>
    <form class="w-4/5 grid gap-6">
      <BaseButton
        color="transparent"
        customClass="border-secondaryGreen border rounded-lg mt-3"
        :shadow="true"
        @click="signInWithGoogle"
      >
        <Icon name="flat-color-icons:google" />
        <span> Login with Google </span></BaseButton
      >
      <div class="bg-transparent border border-lightGray w-full relative my-1">
        <span
          class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-lightGray p-2 rounded-md text-sm"
          >or with</span
        >
      </div>
      <div>
        <label for="email">Email</label>
        <BaseInput
          type="email"
          placeholder="james_hall@gmail.com"
          v-model="factory.email"
          :error="errors.email"
        />
      </div>
      <div>
        <label for="email">Password</label>
        <BaseInput
          type="password"
          placeholder="****************"
          v-model="factory.password"
          :error="errors.password"
        />
      </div>
      <div class="w-full">
        <BaseButton
          type="submit"
          customClass="!bg-secondaryGreen w-full rounded-lg"
          :loading
          :disabled="loading"
          @click="handleSubmit"
          >Log In</BaseButton
        >
      </div>
    </form>
    <p class="font-semibold mt-6">
      Don't have an account?
      <NuxtLink to="/auth/sign-up" class="text-secondaryGreen"
        >Sign Up</NuxtLink
      >
    </p>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Log In",
  meta: [
    {
      name: "description",
      content: "Log in to your account",
    },
  ],
});
useSeoMeta({
  title: "Log In",
  description: "Log in to your account",
  ogDescription: "Log in to your account",
  ogTitle: "Log In",
})
definePageMeta({
  layout: "auth",
});

const factory = ref({
  email: "",
  password: "",
});
const { isValidEmail, isValidPassword } = useValidators();
const { logIn, signInWithGoogle } = useAuth();
const loading = ref(false);
const { addToast } = useToast();

const errors = computed(() => ({
  email: isValidEmail(factory.value.email),
  password: isValidPassword(factory.value.password),
}));
const isFormValid = computed(() => {
  return factory.value.email && factory.value.password;
});

const handleSubmit = async () => {
  loading.value = true;
  if (!isFormValid.value) {
    loading.value = false;
    return addToast("Please fill all fields", "error");
  }

  try {
    await logIn(factory.value);
    loading.value = false;
  } catch (error) {
    console.error("login error:", error);
  }
};
</script>
