<template>
  <div
    class="w-full gap-2 p-2 rounded-lg bg-lightGray flex items-center border border-primaryGreen group-focus-within:border-primaryGreen"
  >
    <slot name="pre" />
    <input
      v-model="content"
      :placeholder="placeholder"
      :min="min"
      :max="max"
      :type="showPassword ? 'text' : type"
      class="grow bg-inherit placeholder:text-slate-400 placeholder:text-sm w-full focus:outline-none"
    />
    <slot name="after" />
    <Icon
      v-if="type === 'password'"
      :name="showPassword ? 'pepicons-pop:eye-off' : 'pepicons-pop:eye'"
      style="color: black; cursor: pointer;"
      size="24"
      @click.stop="showPassword = !showPassword"
    />
    <Icon v-if="error" name="ic:round-error" style="color: red" />
  </div>
</template>

<script lang="ts" setup generic="T">
withDefaults(
  defineProps<{
    placeholder?: string;
    type?: string;
    min?: string | number;
    max?: string | number;
    error?: string;
  }>(),
  {
    placeholder: undefined,
    type: "text",
    min: undefined,
    max: undefined,
    error: undefined,
  }
);

const content = defineModel<T>();
const showPassword = ref(false);
</script>

<style scoped>
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
