<template>
  <component :is="as" :class="[customClass, `font-${weight} text-${size}`]">
    <slot />
  </component>
</template>

<script setup lang="ts">
type Text = "p" | "span" | "label";
const {
  as = "p",
  weight = "normal",
  size = "base",
  customClass = "",
} = defineProps<{
  as: Text;
  weight?: "normal" | "medium" | "semibold" | "bold";
  size?:
    | "xs"
    | "sm"
    | "base"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl";
  customClass?: string;
}>();
</script>
