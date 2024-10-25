<template>
  <div class="flex flex-col h-full w-full justify-center items-center">
    <h1 class="text-2xl font-bold">Log In</h1>
    <form class="w-4/5 grid gap-6" @submit.prevent="handleSubmit">
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
definePageMeta({
  layout: "auth",
});
const factory = ref({
  email: "",
  password: "",
});
const { isValidEmail, isValidPassword } = useValidators();
const errors = computed(() => ({
  email: isValidEmail(factory.value.email),
  password: isValidPassword(factory.value.password),
}));
const isFormValid = computed(() => {
  return factory.value.email && factory.value.password;
});
const handleSubmit = async () => {
  if (!isFormValid.value) return;

  try {
    console.log("Form submitted:", factory.value);
  } catch (error) {
    console.error("Signup error:", error);
  }
};
</script>

<style scoped>
label {
  font-weight: 600;
}
</style>
