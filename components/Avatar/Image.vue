<template>
  <img
    :src
    :alt
    :class="['rounded-full object-cover w-full h-full', customClass]"
  />
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    src?: string;
    alt?: string;
    customClass?: string;
  }>(),
  {
    src: "/images/avatar-img.png",
    alt: "Avatar",
    customClass: "",
  }
);
</script>
