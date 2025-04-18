<template>
  <nav
    class="flex z-50 lg:hidden items-end w-full fixed bottom-0 bg-white border-8 border-grayColor rounded-tl-2xl rounded-tr-2xl shadow"
  >
    <div class="relative w-full">
      <div
        class="absolute -top-6 w-16 h-16 bg-secondaryGreen rounded-3xl transition-all duration-300 ease-in-out"
        :style="{ left: activeTabPosition }"
      ></div>
      <div class="flex justify-around relative z-10">
        <NuxtLink
          v-for="(tab, index) in tabs"
          :key="tab.name"
          :to="tab.to"
          class="flex flex-col items-center gap-1 px-4 py-2 w-1/4"
          @click="setActiveTab(index)"
        >
          <div class="relative">
            <Icon
              :name="tab.icon"
              size="24"
              class="relative z-10 transition-all duration-300"
              :class="{
                'text-white transform -translate-y-3': activeTab === index,
                'text-gray-500': activeTab !== index,
              }"
            />
          </div>
          <BaseText
            as="span"
            :customClass="{
              'text-xs transition-all duration-300': true,
              'text-secondaryGreen font-bold': activeTab === index,
              'text-gray-500': activeTab !== index,
            }"
            >{{ tab.name }}</BaseText
          >
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const tabs = [
  { name: "Home", icon: "ic:round-home", to: "/dashboard/" },
  { name: "Meal", icon: "ic:baseline-set-meal", to: "/dashboard/meal" },
  {
    name: "B-Bite",
    icon: "fa-solid:cookie-bite",
    to: "/dashboard/budget-bite",
  },
  {
    name: "Chat",
    icon: "ri:chat-ai-fill",
    to: "/dashboard/chat",
  },
  { name: "Settings", icon: "iconoir:profile-circle", to: "/settings" },
];

const { isTabletScreen } = useScreenObserver();
const { activeTab, setActiveTab } = useActiveTab();
const activeTabPosition = computed(() => {
  const basePosition = activeTab.value * 20;
  let centeringOffset = 2; 
  watch(
    isTabletScreen,
    () => {
      if (isTabletScreen.value) {
        centeringOffset = 5.5;
      } else {
        centeringOffset = 2;
      }
    },
    { immediate: true }
  );

  if (isTabletScreen.value) {
    return `calc(${basePosition}% + ${centeringOffset}%)`;
  } else {
    return `calc(${basePosition}% + ${centeringOffset}%)`;
  }
});
</script>

<style scoped>
.router-link-active {
  color: theme("colors.secondaryGreen");
}
</style>
