<template>
  <div class="w-full max-h-screen">
    <div
      class="flex items-center justify-between border-b-2 border-grayColor px-4"
    >
      <NuxtLink to="/dashboard/" class="flex items-center py-4">
        <ClientOnly>
          <Icon
            name="ion:nutrition"
            size="28"
            class="text-secondaryGreen shadow"
        /></ClientOnly>
        <h1 class="text-2xl font-bold text-secondaryGreen">Nutri-Lens</h1>
      </NuxtLink>

      <div class="flex items-center gap-4">
        <!-- Desktop Gretting -->
        <div class="hidden sm:flex flex-col items-end mr-4">
          <span class="text-sm text-gray-500">Good {{ timeOfDay }}</span>
          <span class="font-semibold text-base">{{ userName }}</span>
        </div>

        <!-- Notification and Profile -->
        <div class="flex items-center gap-4">
          <div class="relative cursor-pointer" @click="openModal">
            <Icon name="iconamoon:notification-bold" size="30" class="shadow" />
            <span
              v-if="false"
              class="w-3 h-3 rounded-full bg-primaryRed absolute top-0 right-1"
            ></span>
          </div>
          <Avatar customClass="p-1">
            <AvatarImage
              v-if="!avatarImageUrl"
              customClass="rounded-full w-full h-full object-cover"
            />
            <AvatarImage
              v-else
              :src="avatarImageUrl"
              customClass="rounded-full w-full h-full object-cover"
            />
          </Avatar>
        </div>
      </div>
    </div>

    <!-- Notifications Modal -->
    <BaseModal title="Notifications" v-model="modalOpen">
      <p>There are no notifications.</p>
    </BaseModal>

    <!-- Mobile Greeting -->
    <div
      class="flex justify-between items-center sm:hidden px-5 py-2 bg-gray-50 !text-sm"
    >
      <div>
        <span class="text-slate-500">Good {{ timeOfDay }}, </span>
        <span class="font-semibold">{{ userName }}</span>
      </div>
      <BaseButton
        color="red"
        customClass="rounded-lg"
        :shadow="true"
        @click="logOut"
        >Logout</BaseButton
      >
    </div>

    <div class="flex justify-between">
      <SideBar />
      <div class="h-full overflow-y-auto mb-8 pb-16" :style="{ width }">
        <slot />
      </div>
    </div>
    <BottomBar />
  </div>
</template>

<script setup lang="ts">
const { isDesktopScreen } = useScreenObserver();
const { avatarImageUrl } = useProfile();
const { logOut } = useAuth();
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
</script>
