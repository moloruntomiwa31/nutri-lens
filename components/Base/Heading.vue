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

const fontWeightClass = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};
const fontSizeClass = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
};
const computedClass = computed(() => [
  customClass,
  fontWeightClass[weight],
  fontSizeClass[size],
]);
</script>
