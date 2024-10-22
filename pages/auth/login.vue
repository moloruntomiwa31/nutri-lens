<template>
  <div class="flex flex-col h-full w-full justify-center items-center">
    <h1 class="text-2xl font-bold">Log In</h1>
    <form class="w-4/5 grid gap-6">
      <div>
        <label for="email">Email</label>
        <BaseInput type="email" placeholder="james_hall@gmail.com" />
      </div>
      <div>
        <label for="email">Password</label>
        <BaseInput type="password" placeholder="****************" />
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
</script>

<style scoped>
</style>
