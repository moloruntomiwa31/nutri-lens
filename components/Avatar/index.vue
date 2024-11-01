<template>
  <div
    class="relative flex items-center justify-center bg-grayColor rounded-full"
    :class="[
      size === 'lg'
        ? 'w-12 h-12'
        : size === 'xl'
        ? 'w-16 h-16'
        : size === '2xl'
        ? 'w-20 h-20'
        : size === '3xl'
        ? 'w-24 h-24'
        : size === '4xl'
        ? 'w-28 h-28'
        : size === '5xl'
        ? 'w-32 h-32'
        : 'w-10 h-10',
      customClass,
    ]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
    customClass?: string;
  }>(),
  {
    size: "lg",
    customClass: "",
  }
);
</script>
