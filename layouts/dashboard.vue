<template>
  <div class="w-full max-h-screen">
    <div class="flex items-center py-4 px-2">
      <Icon
        name="material-symbols:nutrition-sharp"
        size="35"
        class="text-secondaryGreen"
      />
      <h1 class="text-2xl font-bold text-secondaryGreen">Nutri-Lens</h1>
    </div>
    <SideBar />
    <div class="h-full overflow-y-auto">
      <slot />
    </div>
    <BottomBar />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
