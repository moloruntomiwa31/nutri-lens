<template>
  <component :is="as" :class="computedClass">
    <slot />
  </component>
</template>

<script setup lang="ts">
type Heading = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
const {
  as = "h3",
  weight = "bold",
  size = "base",
  customClass = "",
} = defineProps<{
  as: Heading;
  weight?: "normal" | "medium" | "semibold" | "bold";
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl";
  customClass?: string;
}>();
const computedClass = computed(() => [
  customClass,
  `font-${weight}`,
  `text-${size}`,
]);
</script>
