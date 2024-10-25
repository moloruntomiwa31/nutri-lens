<!-- pages/auth/signup.vue -->
<template>
  <div class="flex flex-col min-h-full w-full justify-center items-center">
    <h1 class="text-2xl font-bold">Create Account</h1>
    <form @submit.prevent="handleSubmit" class="w-4/5 grid gap-6">
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label for="first-name">First Name</label>
          <BaseInput
            placeholder="John"
            v-model="factory.first_name"
            :error="errors.first_name"
          />
        </div>
        <div>
          <label for="last-name">Last Name</label>
          <BaseInput
            placeholder="Doe"
            v-model="factory.last_name"
            :error="errors.last_name"
          />
        </div>
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
        <label for="password">Password</label>
        <BaseInput
          type="password"
          placeholder="****************"
          v-model="factory.password"
          :error="errors.password"
        />
      </div>
      <div>
        <label for="confirm-password">Confirm Password</label>
        <BaseInput
          type="password"
          placeholder="****************"
          v-model="factory.confirm_password"
          :error="errors.confirm_password"
        />
      </div>
      <div class="w-full">
        <BaseButton
          type="submit"
          customClass="!bg-secondaryGreen w-full rounded-lg"
          :disabled="!isFormValid"
        >
          Sign Up
        </BaseButton>
      </div>
    </form>
    <p class="font-semibold mt-6">
      Already have an account?
      <NuxtLink to="/auth/login" class="text-secondaryGreen">Login</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import type FormData from '@/types/FormData';
import type FormErrors from '@/types/FormErrors';
definePageMeta({
  layout: "auth",
});

const factory = ref<FormData>({
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirm_password: "",
});

const { isMinimumLength, isValidEmail, isValidPassword, samePasswordAs } =
  useValidators();

const errors = computed<FormErrors>(() => ({
  first_name: isMinimumLength(factory.value.first_name),
  last_name: isMinimumLength(factory.value.last_name),
  email: isValidEmail(factory.value.email),
  password: isValidPassword(factory.value.password),
  confirm_password: samePasswordAs(
    factory.value.password,
    factory.value.confirm_password
  ),
}));

const isFormValid = computed(() => {
  return (
    factory.value.first_name &&
    factory.value.last_name &&
    factory.value.email &&
    factory.value.password &&
    factory.value.confirm_password &&
    !Object.values(errors.value).some((error) => error !== "")
  );
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
