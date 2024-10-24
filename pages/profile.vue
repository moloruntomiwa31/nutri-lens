<template>
  <div class="flex items-center justify-center h-full mt-4">
    <div
      class="bg-grayColor rounded-lg w-4/5 md:w-[600px] lg:w-[700px] xl:w-[800px] h-[500px] p-6"
    >
    <h2 class="text-2xl font-bold">Profile Info</h2>
      <div
        class="flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 py-2 h-4/5"
      >
        <div
          class="flex items-center justify-center w-[250px] h-[250px] bg-lightGray shadow rounded-full relative text-secondaryGreen"
        >
          <Icon name="gg:profile" size="120" />
          <BaseFileInput accept=".jpg, .png">
            <Icon
              name="flowbite:upload-outline"
              size="30"
              class="absolute bottom-8 right-4"
            />
          </BaseFileInput>
        </div>
        <div class="grow space-y-8">
          <BaseInput placeholder="Hello" />
          <BaseInput />
        </div>
        <!-- <div class="mt-4">
            <img
              alt="Image Preview"
              class="rounded-lg h-48 w-full object-cover"
            />
          </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});
</script>
