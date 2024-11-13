<template>
  <div class="flex flex-col gap-6 items-center justify-center h-screen bg">
    <BaseHeading as="h1" weight="bold" size="5xl">
      {{ error?.statusCode }}
    </BaseHeading>
    <img src="/public/error.svg" alt="error" class="w-64 h-64" />
    <BaseButton
      color="transparent"
      customClass="flex items-center gap-2 border-b border-black border-b-2"
      @click="navigateTo('/')"
    >
      <Icon name="hugeicons:arrow-turn-backward" class="-rotate-180" />
      <BaseText>Go home</BaseText>
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";
defineProps<{
  error: NuxtError;
}>();
</script>

<style scoped>
.bg {
  background-image: url("/public/error-bg.svg");
}
</style>
