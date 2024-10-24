<template>
  <div class="w-full max-h-screen">
    <div class="flex items-center justify-between border-b-2 border-grayColor">
      <div class="flex items-center py-4 px-2">
        <Icon
          name="material-symbols:nutrition-sharp"
          size="35"
          class="text-secondaryGreen shadow"
        />
        <h1 class="text-2xl font-bold text-secondaryGreen">Nutri-Lens</h1>
      </div>
      <div class="flex items-center">
        <div class="flex items-center p-1 w-10 h-10 rounded-full">
          <img src="/public/images/auth/auth.jpg" alt="" class="rounded-full w-full h-full">
        </div>
        <div class="relative">
          <Icon name="mingcute:notification-fill" size="30" class="shadow" />
          <span
            class="w-3 h-3 rounded-full bg-primaryRed absolute top-0 right-1.5"
          ></span>
        </div>
      </div>
    </div>
    <div class="flex justify-between">
      <SideBar />
      <div class="h-full overflow-y-auto mb-8" :style="{ width }">
        <slot />
      </div>
    </div>
    <BottomBar />
  </div>
</template>

<script setup lang="ts">
const { isDesktopScreen } = useScreenObserver();
const width = computed(() =>
  isDesktopScreen.value ? "calc(100% - 256px)" : "100%"
);
</script>

<style scoped></style>
