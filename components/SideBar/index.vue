<template>
  <div class="relative">
    <aside
      class="w-[256px] z-50 bg-primaryGreen h-screen fixed top-0 left-0 hidden lg:block"
    >
      <div class="flex items-center py-4 px-2">
        <Icon name="material-symbols:nutrition-sharp" size="35" />
        <h1 class="text-2xl font-bold">Nutri-Lens</h1>
      </div>
      <nav class="flex flex-col justify-between gap-4 p-4">
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
              name: 'Budget Bite',
              icon: 'fa-solid:cookie-bite',
              to: '/dashboard/budget-bite',
            },
            {
              name: 'Profile',
              icon: 'iconoir:profile-circle',
              to: '/profile',
            },
          ]"
          :key="tab.name"
          :to="tab.to"
          class="font-medium hover:bg-white hover:text-secondaryGreen duration-200 transition text-base rounded-lg py-4 px-1"
          active-class="bg-white text-secondaryGreen font-extrabold"
        >
          <div class="flex items-center gap-1">
            <Icon :name="tab.icon" size="24" />
            <span class="text-sm">{{ tab.name }}</span>
          </div></NuxtLink
        >
        <div class="py-4 px-1">
          <NuxtLink
            to="/dashboard"
            class="font-medium text-primaryRed text-base rounded-lg"
            ><div class="flex items-center gap-1">
              <Icon name="mingcute:power-fill" />
              <span class="text-sm">LogOut</span>
            </div></NuxtLink
          >
        </div>
      </nav>
    </aside>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
