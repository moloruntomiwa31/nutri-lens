<template>
  <button
    :disabled="loading || disabled"
    class="focus:outline-none disabled:opacity-80 flex gap-2 items-center justify-center whitespace-nowrap duration-200 font-semibold disabled:cursor-not-allowed"
    :type="type"
    :class="[
      shadow ? 'shadow' : '',
      padding,
      customClass,
      {
        'bg-primaryRed hover:bg-red-500 text-white': color === 'red',
        'bg-secondaryGreen hover:bg-primaryGreen text-white': color === 'green',
        'bg-[#FBFBFB] text-black': color === 'white',
        'bg-grayColor text-white': color === 'gray',
        'bg-transparent': color === 'transparent',
        'bg-primaryBlue hover:bg-blue-600 text-white': color === 'blue',
      },
    ]"
  >
    <span v-if="loading" class="animate-spin">
      <Icon name="icomoon-free:spinner10" class="text-white"
    /></span>
    <slot />
  </button>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    color?: "red" | "green" | "white" | "gray" | "transparent" | "blue";
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
