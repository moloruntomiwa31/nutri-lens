<template>
  <div class="relative">
    <aside
      class="w-64 bg-primaryGreen h-screen fixed top-0 left-0 hidden lg:block"
    >
      <div class="flex items-center py-4 px-2">
        <Icon name="material-symbols:nutrition-sharp" size="35" />
        <h1 class="text-2xl font-bold">Nutri-Lens</h1>
      </div>
      <nav class="flex flex-col gap-4 p-4">
        <NuxtLink
          v-for="tab in [
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
              name: 'Barcode Scanner',
              icon: 'material-symbols:barcode-reader',
              to: '/dashboard/scan',
            },
            {
              name: 'Profile',
              icon: 'iconoir:profile-circle',
              to: '/plans',
            },
          ]"
          :key="tab.name"
          :to="tab.to"
          class="font-medium hover:bg-white hover:text-secondaryGreen duration-200 transition text-base rounded-lg py-4 px-1"
          active-class="bg-white text-secondaryGreen font-bold"
        >
          <div class="flex items-center gap-1">
            <Icon :name="tab.icon" size="24" />
            <span class="text-sm">{{ tab.name }}</span>
          </div></NuxtLink
        >
      </nav>
    </aside>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
