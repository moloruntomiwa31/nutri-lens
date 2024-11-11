<template>
  <div class="flex flex-col h-full w-full justify-center items-center">
    <BaseHeading as="h1" size="2xl" weight="bold">Log In</BaseHeading>
    <form class="w-4/5 grid gap-6">
      <BaseButton
        color="transparent"
        customClass="border-secondaryGreen border rounded-lg mt-3"
        :shadow="true"
        @click="signInWithGoogle"
      >
        <Icon name="flat-color-icons:google" />
        <BaseText as="span"> Login with Google </BaseText></BaseButton
      >
      <div class="bg-transparent border border-lightGray w-full relative my-1">
        <BaseText
          as="span"
          customClass="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-lightGray p-2 rounded-md text-sm"
          >or with</BaseText
        >
      </div>
      <div>
        <BaseText as="label" weight="medium">Email</BaseText>
        <BaseInput
          type="email"
          placeholder="james_hall@gmail.com"
          v-model="factory.email"
          :error="errors.email"
        />
      </div>
      <div>
        <BaseText as="label" weight="medium">Password</BaseText>
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
    <BaseText customClass="mt-6" weight="semibold">
      Don't have an account?
      <NuxtLink to="/auth/sign-up" class="text-secondaryGreen"
        >Sign Up</NuxtLink
      >
    </BaseText>
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
});
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
