<!-- BaseInput.vue -->
<template>
  <div
    class="relative w-full gap-2 p-2 rounded-lg bg-lightGray flex items-center border duration-300 transition"
    :class="{
      'border-primaryRed shadow-primaryRed shadow': shouldShowError,
      'border-primaryGreen shadow-primaryGreen shadow': !shouldShowError,
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
      @input="handleInput"
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
      v-if="shouldShowError"
      name="ic:round-error"
      style="color: red"
      :class="type === 'password' ? 'absolute right-8' : ''"
    />
    <BaseText
      as="span"
      size="sm"
      v-if="shouldShowError"
      customClass="text-primaryRed absolute -bottom-6"
    >
      {{ error }}
    </BaseText>
  </div>
</template>

<script lang="ts" setup generic="T">
const props = withDefaults(
  defineProps<{
    placeholder?: string;
    type?: string;
    min?: string | number;
    max?: string | number;
    error?: string;
    validateOnChange?: boolean;
  }>(),
  {
    placeholder: undefined,
    type: "text",
    min: undefined,
    max: undefined,
    error: undefined,
    validateOnChange: false,
  }
);

const content = defineModel<T>();
const showPassword = ref(false);
const touched = ref(false);
const isDirty = ref(false);

const shouldShowError = computed(() => {
  if (!props.error) return false;
  if (props.validateOnChange && isDirty.value) return true;
  return touched.value;
});

watch(content, (newVal) => {
  if (!newVal && typeof newVal !== "number") {
    isDirty.value = false;
    touched.value = false;
  }
});

const handleInput = (event: Event) => {
  isDirty.value = true;
  if (props.validateOnChange) {
    touched.value = true;
  }
};
</script>

<style scoped>
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
