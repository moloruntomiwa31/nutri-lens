<template>
  <div class="space-y-8 animate-fade-in">
    <div class="text-center space-y-2">
      <BaseHeading as="h1" size="2xl" weight="bold" class="text-gray-900">Welcome Back</BaseHeading>
      <BaseText size="sm" class="text-gray-500">Enter your credentials to access your nutrition dashboard</BaseText>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="space-y-4">
        <div class="space-y-2">
          <BaseText as="label" weight="medium" class="text-sm text-gray-700 ml-1">Email Address</BaseText>
          <BaseInput
            type="email"
            placeholder="name@example.com"
            v-model="factory.email"
            :error="errors.email"
            class="rounded-2xl border-gray-200 focus:border-primaryGreen transition-all"
          />
        </div>
        
        <div class="space-y-2">
          <div class="flex justify-between items-center ml-1">
            <BaseText as="label" weight="medium" class="text-sm text-gray-700">Password</BaseText>
            <a href="#" class="text-xs text-secondaryGreen hover:underline">Forgot password?</a>
          </div>
          <BaseInput
            type="password"
            placeholder="••••••••"
            v-model="factory.password"
            :error="errors.password"
            class="rounded-2xl border-gray-200 focus:border-primaryGreen transition-all"
          />
        </div>
      </div>

      <div class="space-y-4 pt-2">
        <BaseButton
          type="submit"
          customClass="w-full rounded-2xl py-4 bg-secondaryGreen hover:bg-secondaryGreen/90 shadow-lg shadow-secondaryGreen/20 transform active:scale-[0.98] transition-all"
          :loading="loading"
          :disabled="loading"
        >
          Sign In
        </BaseButton>

        <div class="relative flex items-center justify-center">
          <div class="w-full border-t border-gray-100"></div>
          <span class="absolute bg-white/50 backdrop-blur-sm px-4 text-xs text-gray-400 uppercase tracking-widest">or continue with</span>
        </div>

        <BaseButton
          type="button"
          color="transparent"
          customClass="w-full border border-gray-200 rounded-2xl py-4 hover:bg-gray-50 transition-all flex items-center justify-center gap-3 group"
          @click="signInWithGoogle"
        >
          <Icon name="flat-color-icons:google" size="24" />
          <span class="text-gray-700 font-semibold group-hover:text-black">Google</span>
        </BaseButton>
      </div>
    </form>

    <p class="text-center text-sm text-gray-500">
      New to Nutri-Lens?
      <NuxtLink to="/auth/sign-up" class="text-secondaryGreen font-bold hover:underline decoration-2 underline-offset-4">
        Create an account
      </NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
const factory = ref({
  email: "",
  password: "",
});

const { isValidEmail, isValidPassword } = useValidators();
const { logIn, signInWithGoogle } = useAuth();
const loading = ref(false);
const { addToast } = useToast();

const errors = computed(() => ({
  email: factory.value.email ? isValidEmail(factory.value.email) : "",
  password: factory.value.password ? isValidPassword(factory.value.password) : "",
}));

const isFormValid = computed(() => {
  return factory.value.email && factory.value.password && !errors.value.email && !errors.value.password;
});

const handleSubmit = async () => {
  if (!isFormValid.value) {
    return addToast("Please enter valid credentials", "error");
  }

  loading.value = true;
  try {
    await logIn(factory.value);
  } catch (error) {
    console.error("login error:", error);
    addToast("Login failed. Please check your credentials.", "error");
  } finally {
    loading.value = false;
  }
};

useHead({
  title: "Welcome Back | Nutri-Lens",
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

