<template>
  <div class="relative flex-shrink-0">
    <div
      class="w-[270px] h-[400px] rounded-lg bg-gray-100 flex justify-center items-center"
    >
      <Icon name="fa6-solid:plate-wheat" size="100" class="text-gray-300" />
      <div
        class="absolute bottom-4 left-4 flex items-center bg-white bg-opacity-80 rounded-full px-4 py-2 transition-transform"
        role="button"
        tabindex="0"
      >
        <BaseText
          as="span"
          customClass="w-12 h-3 bg-primaryGreen rounded-full mr-2"
          aria-hidden="true"
        ></BaseText>
        <BaseText as="span" weight="medium" size="sm">No recipe</BaseText>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
