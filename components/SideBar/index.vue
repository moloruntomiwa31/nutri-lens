<template>
  <div class="relative">
    <aside
      class="w-[256px] z-50 bg-primaryGreen h-screen fixed top-0 left-0 hidden lg:block"
    >
      <div class="flex items-center py-4 px-2">
        <ClientOnly>
          <Icon name="ion:nutrition" size="28" class="shadow-lg"
        /></ClientOnly>
        <BaseHeading size="2xl" as="h3">Nutri-Lens</BaseHeading>
      </div>
      <nav class="flex flex-col justify-between gap-4 p-4">
        <NuxtLink
          v-for="(tab, index) in [
            {
              name: 'Home',
              icon: 'ic:round-home',
              to: '/dashboard/',
            },
            {
              name: 'Meal Recipe Breakdown',
              icon: 'ic:baseline-set-meal',
              to: '/dashboard/meal',
            },
            {
              name: 'Budget Bite',
              icon: 'fa-solid:cookie-bite',
              to: '/dashboard/budget-bite',
            },
            {
              name: 'Settings',
              icon: 'iconoir:profile-circle',
              to: '/settings',
            },
          ]"
          :key="tab.name"
          :to="tab.to"
          @click="setActiveTab(index)"
          class="font-medium hover:bg-white hover:text-secondaryGreen duration-200 transition text-base rounded-lg py-4 px-1"
          active-class="bg-white text-secondaryGreen font-extrabold"
        >
          <div class="flex items-center gap-1">
            <Icon :name="tab.icon" size="24" />
            <BaseText as="span" size="sm">{{ tab.name }}</BaseText>
          </div></NuxtLink
        >
        <div class="py-4 px-1">
          <BaseButton
            color="transparent"
            customClass="!text-primaryRed flex items-center !gap-1"
            padding="px-0 py-0"
            @click="logOut"
          >
            <Icon name="mingcute:power-fill" />
            <BaseText as="span">Logout</BaseText></BaseButton
          >
        </div>
      </nav>
    </aside>
  </div>
</template>

<script setup lang="ts">
const { setActiveTab } = useActiveTab();
const { logOut } = useAuth();
</script>
