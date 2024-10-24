<template>
  <label class="cursor-pointer">
    <input
      type="file"
      :accept="accept"
      ref="inputFile"
      @change="handleFileInput"
      class="hidden"
    />
    <slot />
  </label>
</template>

<script setup lang="ts">
defineProps<{
  accept: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const inputFile = ref<HTMLInputElement | null>(null);

const handleFileInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    emit("update:modelValue", file);
  }
};
</script>

<style scoped></style>
