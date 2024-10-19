<template>
  <div class="flex flex-col min-h-full w-full justify-center items-center">
    <h1 class="text-2xl font-bold">Create Account</h1>
    <form class="w-4/5 grid gap-6">
      <div>
        <label for="email">Email</label>
        <BaseInput type="email" placeholder="james_hall@gmail.com" />
      </div>
      <div>
        <label for="email">Password</label>
        <BaseInput type="password" placeholder="****************" />
      </div>
      <div>
        <label for="email">Confirm Password</label>
        <BaseInput type="password" placeholder="****************" />
      </div>
      <div class="w-full">
        <BaseButton
          type="submit"
          customClass="!bg-secondaryGreen w-full rounded-lg"
          >Sign Up</BaseButton
        >
      </div>
    </form>
    <p class="font-semibold mt-6">
      Already have an account?
      <NuxtLink to="/auth/login" class="text-secondaryGreen">Login</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "auth",
});
</script>

<style scoped>
label {
  font-weight: 600;
}
</style>
