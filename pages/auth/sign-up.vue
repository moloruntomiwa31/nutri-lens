<template>
  <div class="flex flex-col min-h-full w-full justify-center items-center">
    <BaseHeading as="h1" size="2xl" weight="bold">Create Account</BaseHeading>
    <form class="w-4/5 grid gap-6">
      <BaseButton
        color="transparent"
        customClass="border-secondaryGreen border rounded-lg mt-3"
        :shadow="true"
        @click="signInWithGoogle"
      >
        <Icon name="flat-color-icons:google" />
        <BaseText as="span"> Continue with Google </BaseText></BaseButton
      >
      <div class="bg-transparent border border-lightGray w-full relative my-1">
        <BaseText
          as="span"
          class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-lightGray p-2 rounded-md text-sm"
          >or with</BaseText
        >
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <BaseText as="label" weight="medium">First Name</BaseText>
          <BaseInput
            placeholder="John"
            v-model="factory.first_name"
            :error="errors.first_name"
          />
        </div>
        <div>
          <BaseText as="label" weight="medium">Last Name</BaseText>
          <BaseInput
            placeholder="Doe"
            v-model="factory.last_name"
            :error="errors.last_name"
          />
        </div>
      </div>
      <div>
        <BaseText as="label" weight="medium">Email</BaseText>
        <BaseInput
          type="email"
          placeholder="john_doe@gmail.com"
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
      <div>
        <BaseText as="label" weight="medium">Confirm Password</BaseText>
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
    </form>
    <BaseText class="mt-6" weight="semibold">
      Already have an account?
      <NuxtLink to="/auth/login" class="text-secondaryGreen">Login</NuxtLink>
    </BaseText>
  </div>
</template>

<script setup lang="ts">
import type UserFormData from "~/types/UserFormData";
import type FormErrors from "@/types/FormErrors";
useHead({
  title: "Sign Up",
  meta: [
    {
      name: "description",
      content: "Create an account",
    },
  ],
});
useSeoMeta({
  title: "Sign Up",
  description: "Create an account",
  ogDescription: "Create an account",
  ogTitle: "Sign Up",
});
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
