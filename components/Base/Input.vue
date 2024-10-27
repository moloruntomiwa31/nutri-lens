<!-- BaseInput.vue -->
<template>
  <div
    class="relative w-full gap-2 p-2 rounded-lg bg-lightGray flex items-center border duration-300 transition"
    :class="{
      'border-primaryRed shadow-primaryRed shadow': error && touched,
      'border-primaryGreen shadow-primaryGreen shadow': !error || !touched,
    }"
  >
    <slot name="pre" />
    <input
      v-model="content"
      :placeholder="placeholder"
      :min="min"
      :max="max"
      :type="showPassword ? 'text' : type"
      class="grow bg-inherit placeholder:text-slate-400 placeholder:text-sm w-full focus:outline-none"
      @blur="touched = true"
    />
    <slot name="after" />
    <Icon
      v-if="type === 'password'"
      :name="showPassword ? 'pepicons-pop:eye-off' : 'pepicons-pop:eye'"
      style="color: black; cursor: pointer"
      size="24"
      @click.stop="showPassword = !showPassword"
    />
    <Icon
      v-if="error && touched"
      name="ic:round-error"
      style="color: red"
      :class="type === 'password' ? 'absolute right-8' : ''"
    />
    <span
      v-if="error && touched"
      class="text-primaryRed text-sm absolute -bottom-5"
    >
      {{ error }}
    </span>
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
const touched = ref(false);
</script>

<style scoped>
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
