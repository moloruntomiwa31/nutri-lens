<template>
  <div class="w-full max-h-screen">
    <div
      class="flex items-center justify-between border-b-2 border-grayColor px-4"
    >
      <div class="flex items-center py-4">
        <Icon
          name="material-symbols:nutrition-sharp"
          size="35"
          class="text-secondaryGreen shadow"
        />
        <h1 class="text-2xl font-bold text-secondaryGreen">Nutri-Lens</h1>
      </div>

      <div class="flex items-center gap-4">
        <!-- Desktop Gretting -->
        <div class="hidden sm:flex flex-col items-end mr-4">
          <span class="text-sm text-gray-500">Good {{ timeOfDay }}</span>
          <span class="font-semibold text-base">{{ userName }}</span>
        </div>

        <!-- Notification and Profile -->
        <div class="flex items-center gap-4">
          <div class="relative cursor-pointer" @click="openModal">
            <Icon name="mingcute:notification-fill" size="30" class="shadow" />
            <span
              class="w-3 h-3 rounded-full bg-primaryRed absolute top-0 right-1"
            ></span>
          </div>
          <div class="flex items-center p-1 w-10 h-10 rounded-full">
            <img
              src="/public/images/auth/auth.jpg"
              alt="User profile"
              class="rounded-full w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Notifications Modal -->
    <BaseModal title="Notifications" @close="closeModal" v-show="modalOpen">
      <p>There are no notifications.</p>
    </BaseModal>

    <!-- Mobile Greeting -->
    <div class="sm:hidden px-4 py-2 bg-gray-50">
      <span class="text-sm text-slate-500">Good {{ timeOfDay }}, </span>
      <span class="font-semibold">{{ userName }}</span>
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
const timeOfDay = computed(() => {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  return "evening";
});
const userName = computed(() => {
  return "John";
});
const modalOpen = ref(false);
const openModal = () => {
  modalOpen.value = true;
};
const closeModal = () => {
  modalOpen.value = false;
};
</script>
