<template>
  <div class="flex flex-col min-h-full w-full justify-center items-center">
    <h1 class="text-2xl font-bold">Create Account</h1>
    <fieldset class="w-4/5 grid gap-6">
      <BaseButton
        color="transparent"
        customClass="border-secondaryGreen border rounded-lg mt-3"
        :shadow="true"
        @click="signInWithGoogle"
      >
        <Icon name="flat-color-icons:google" />
        <span> Continue with Google </span></BaseButton
      >
      <div class="bg-transparent border border-lightGray w-full relative my-1">
        <span
          class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-lightGray p-2 rounded-md text-sm"
          >or with</span
        >
      </div>
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
          @click="handleSubmit"
          customClass="!bg-secondaryGreen w-full rounded-lg"
          :disabled="loading"
          :loading
        >
          Sign Up
        </BaseButton>
      </div>
    </fieldset>
    <p class="font-semibold mt-6">
      Already have an account?
      <NuxtLink to="/auth/login" class="text-secondaryGreen">Login</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import type UserFormData from "~/types/UserFormData";
import type FormErrors from "@/types/FormErrors";
definePageMeta({
  layout: "auth",
});

const factory = ref<UserFormData>({
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirm_password: "",
});
const loading = ref(false);

const { isMinimumLength, isValidEmail, isValidPassword, samePasswordAs } =
  useValidators();
const { signUp, signInWithGoogle } = useAuth();
const { addToast } = useToast();

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
  console.log("clicked");
  loading.value = true;
  if (!isFormValid.value) {
    loading.value = false;
    return addToast("Please fill all fields", "error");
  }
  await signUp(factory.value);
  loading.value = false;
};
</script>
