<template>
  <aside
    class="hidden lg:flex flex-col w-72 bg-white border-r border-gray-100 h-screen sticky top-0 z-40 overflow-y-auto scrollbar-hide"
  >
    <!-- Logo Section -->
    <div class="p-8">
      <NuxtLink to="/dashboard/" class="flex items-center gap-3 group">
        <div class="w-10 h-10 rounded-xl bg-primaryGreen flex items-center justify-center shadow-lg shadow-primaryGreen/20 group-hover:scale-110 transition-transform">
          <Icon name="ion:nutrition" size="24" class="text-white" />
        </div>
        <span class="text-2xl font-bold text-gray-900 tracking-tight">Nutri-<span class="text-primaryGreen">Lens</span></span>
      </NuxtLink>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-4 space-y-2">
      <NuxtLink
        v-for="(tab, index) in navigationTabs"
        :key="tab.name"
        :to="tab.to"
        @click="setActiveTab(index)"
        class="flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group"
        :class="[
          $route.path === tab.to 
            ? 'bg-primaryGreen/10 text-primaryGreen' 
            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
        ]"
      >
        <div 
          class="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
          :class="[$route.path === tab.to ? 'bg-primaryGreen text-white shadow-lg shadow-primaryGreen/20' : 'bg-gray-50 text-gray-400 group-hover:bg-white group-hover:shadow-md']"
        >
          <Icon :name="tab.icon" size="20" />
        </div>
        <span class="font-bold text-sm tracking-wide">{{ tab.name }}</span>
      </NuxtLink>
    </nav>

    <!-- Bottom Actions -->
    <div class="p-4 border-t border-gray-50">
      <button
        @click="logOut"
        class="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-gray-400 hover:text-primaryRed hover:bg-red-50 transition-all group"
      >
        <div class="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-white group-hover:shadow-md transition-all">
          <Icon name="mingcute:power-fill" size="20" />
        </div>
        <span class="font-bold text-sm tracking-wide">Logout</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
const navigationTabs = [
  { name: 'Dashboard', icon: 'ic:round-home', to: '/dashboard/' },
  { name: 'Meal Analysis', icon: 'ic:baseline-set-meal', to: '/dashboard/meal' },
  { name: 'Budget Bite', icon: 'fa-solid:cookie-bite', to: '/dashboard/budget-bite' },
  { name: 'AI Chat', icon: 'ri:chat-ai-fill', to: '/dashboard/chat' },
  { name: 'Profile Settings', icon: 'iconoir:profile-circle', to: '/settings' },
];

const { setActiveTab } = useActiveTab();
const { logOut } = useAuth();
</script>

