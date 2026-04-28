<template>
  <div class="space-y-8 animate-fade-in">
    <div class="text-center space-y-2">
      <BaseHeading as="h1" size="2xl" weight="bold" class="text-gray-900">Create Account</BaseHeading>
      <BaseText size="sm" class="text-gray-500">Join Nutri-Lens and start your health journey</BaseText>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-5">
      <div class="grid grid-cols-2 gap-4">
        <div class="space-y-1.5">
          <BaseText as="label" weight="medium" class="text-xs text-gray-500 ml-1 uppercase tracking-wider">First Name</BaseText>
          <BaseInput
            placeholder="John"
            v-model="factory.first_name"
            :error="errors.first_name"
            class="rounded-2xl border-gray-100 focus:border-primaryGreen transition-all shadow-sm"
          />
        </div>
        <div class="space-y-1.5">
          <BaseText as="label" weight="medium" class="text-xs text-gray-500 ml-1 uppercase tracking-wider">Last Name</BaseText>
          <BaseInput
            placeholder="Doe"
            v-model="factory.last_name"
            :error="errors.last_name"
            class="rounded-2xl border-gray-100 focus:border-primaryGreen transition-all shadow-sm"
          />
        </div>
      </div>

      <div class="space-y-1.5">
        <BaseText as="label" weight="medium" class="text-xs text-gray-500 ml-1 uppercase tracking-wider">Email Address</BaseText>
        <BaseInput
          type="email"
          placeholder="name@example.com"
          v-model="factory.email"
          :error="errors.email"
          class="rounded-2xl border-gray-100 focus:border-primaryGreen transition-all shadow-sm"
        />
      </div>

      <div class="space-y-1.5">
        <BaseText as="label" weight="medium" class="text-xs text-gray-500 ml-1 uppercase tracking-wider">Password</BaseText>
        <BaseInput
          type="password"
          placeholder="••••••••"
          v-model="factory.password"
          :error="errors.password"
          class="rounded-2xl border-gray-100 focus:border-primaryGreen transition-all shadow-sm"
        />
      </div>

      <div class="space-y-1.5 pb-2">
        <BaseText as="label" weight="medium" class="text-xs text-gray-500 ml-1 uppercase tracking-wider">Confirm Password</BaseText>
        <BaseInput
          type="password"
          placeholder="••••••••"
          v-model="factory.confirm_password"
          :error="errors.confirm_password"
          class="rounded-2xl border-gray-100 focus:border-primaryGreen transition-all shadow-sm"
        />
      </div>

      <div class="space-y-4 pt-2">
        <BaseButton
          type="submit"
          customClass="w-full rounded-2xl py-4 bg-secondaryGreen hover:bg-secondaryGreen/90 shadow-lg shadow-secondaryGreen/20 transform active:scale-[0.98] transition-all"
          :loading="loading"
          :disabled="loading"
        >
          Create Account
        </BaseButton>

        <div class="relative flex items-center justify-center">
          <div class="w-full border-t border-gray-100"></div>
          <span class="absolute bg-white/50 backdrop-blur-sm px-4 text-xs text-gray-400 uppercase tracking-widest">or</span>
        </div>

        <BaseButton
          type="button"
          color="transparent"
          customClass="w-full border border-gray-200 rounded-2xl py-4 hover:bg-gray-50 transition-all flex items-center justify-center gap-3 group"
          @click="signInWithGoogle"
        >
          <Icon name="flat-color-icons:google" size="24" />
          <span class="text-gray-700 font-semibold group-hover:text-black">Join with Google</span>
        </BaseButton>
      </div>
    </form>

    <p class="text-center text-sm text-gray-500">
      Already have an account?
      <NuxtLink to="/auth/login" class="text-secondaryGreen font-bold hover:underline decoration-2 underline-offset-4">
        Sign in
      </NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import type UserFormData from "~/types/UserFormData";
import type FormErrors from "@/types/FormErrors";

const factory = ref<UserFormData>({
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirm_password: "",
});

const loading = ref(false);
const { isMinimumLength, isValidEmail, isValidPassword, samePasswordAs } = useValidators();
const { signUp, signInWithGoogle } = useAuth();
const { addToast } = useToast();

const errors = computed<FormErrors>(() => ({
  first_name: factory.value.first_name ? isMinimumLength(factory.value.first_name) : "",
  last_name: factory.value.last_name ? isMinimumLength(factory.value.last_name) : "",
  email: factory.value.email ? isValidEmail(factory.value.email) : "",
  password: factory.value.password ? isValidPassword(factory.value.password) : "",
  confirm_password: factory.value.confirm_password ? samePasswordAs(factory.value.password, factory.value.confirm_password) : "",
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
  if (!isFormValid.value) {
    return addToast("Please complete the form correctly", "error");
  }

  loading.value = true;
  try {
    await signUp(factory.value);
  } catch (error) {
    console.error("Signup error:", error);
    addToast("Signup failed. Please try again.", "error");
  } finally {
    loading.value = false;
  }
};

useHead({
  title: "Join Nutri-Lens | AI-Powered Nutrition",
});

definePageMeta({
  layout: "auth",
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
</style>

