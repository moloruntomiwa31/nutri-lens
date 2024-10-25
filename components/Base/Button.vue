<template>
  <button
    :disabled="loading || disabled"
    class="focus:outline-none disabled:opacity-100 flex gap-2 items-center justify-center whitespace-nowrap duration-100"
    :type="type"
    :class="[
      shadow ? 'shadow-lg' : '',
      padding, customClass,
  {
    'bg-primaryRed text-white': color === 'red',
      'bg-primaryGreen text-white': color === 'green',
      'bg-[#FBFBFB] text-black': color === 'white',
      'bg-grayColor text-white': color === 'gray',
      'bg-transparent': color === 'transparent',
  }
]"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    color?: "red" | "green" | "white" | "gray" | "transparent";
    padding?: string;
    loading?: boolean;
    shadow?: boolean;
    disabled?: boolean;
    type?: "reset" | "submit" | "button";
    customClass?: string;
  }>(),
  {
    color: "green",
    padding: "p-2",
    loading: false,
    shadow: false,
    disabled: false,
    type: "button",
  }
);
</script>
