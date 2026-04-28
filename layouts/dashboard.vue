<template>
  <div class="min-h-screen bg-light-bg flex">
    <!-- Redesigned Sidebar -->
    <SideBar />

    <div class="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
      <!-- Premium Header -->
      <header class="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-30">
        <div class="flex items-center gap-4 lg:hidden">
          <NuxtLink to="/dashboard/" class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg bg-primaryGreen flex items-center justify-center">
              <Icon name="ion:nutrition" size="20" class="text-white" />
            </div>
            <span class="text-xl font-bold text-gray-900 tracking-tight">Nutri-Lens</span>
          </NuxtLink>
        </div>

        <div class="hidden lg:block">
          <BaseHeading as="h2" size="xl" weight="bold" class="text-gray-900 after:hidden !mb-0 tracking-tighter">
            Good {{ timeOfDay }}, {{ userName.split(' ')[0] }}
          </BaseHeading>
        </div>

        <div class="flex items-center gap-6">
          <!-- Notification -->
          <button 
            @click="modalOpen = true"
            class="relative w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors group"
          >
            <Icon name="iconamoon:notification-bold" size="22" class="text-gray-500 group-hover:text-secondaryGreen transition-colors" />
            <span v-if="notifications.length" class="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-primaryRed ring-2 ring-white"></span>
          </button>

          <!-- User Profile -->
          <div 
            @click="toSettings"
            class="flex items-center gap-3 cursor-pointer group"
          >
            <div class="hidden sm:block text-right">
              <p class="text-sm font-bold text-gray-900 group-hover:text-secondaryGreen transition-colors">{{ userName }}</p>
              <p class="text-xs text-gray-400 capitalize">{{ timeOfDay }}</p>
            </div>
            <div class="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-gray-50 group-hover:ring-primaryGreen/30 transition-all">
              <img 
                v-if="avatarImageUrl" 
                :src="avatarImageUrl" 
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full bg-primaryGreen flex items-center justify-center">
                <Icon name="iconoir:profile-circle" size="24" class="text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content Area -->
      <main class="flex-1 overflow-y-auto p-6 pb-24 lg:pb-8 scrollbar-hide">
        <div class="max-w-7xl mx-auto animate-fade-in">
          <slot />
        </div>
      </main>
    </div>

    <!-- Mobile Navigation -->
    <BottomBar />

    <!-- Notifications Modal -->
    <BaseModal title="Notifications" v-model="modalOpen">
      <div class="space-y-4 py-2">
        <div 
          v-for="(note, i) in notifications" 
          :key="i"
          class="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex gap-4"
        >
          <div class="w-8 h-8 rounded-lg bg-primaryGreen/10 flex items-center justify-center flex-shrink-0">
            <Icon name="heroicons-solid:bell" size="18" class="text-primaryGreen" />
          </div>
          <p class="text-sm text-gray-600 leading-relaxed">{{ note }}</p>
        </div>
        <p v-if="!notifications.length" class="text-center text-gray-400 py-8 italic">No new notifications</p>
      </div>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
const { isDesktopScreen } = useScreenObserver();
const { avatarImageUrl } = useProfile();
const { user, logOut } = useAuth();
const router = useRouter();
const { setActiveTab } = useActiveTab();

const notifications = ref([
  "Try out our meal analysis feature.",
  "Get personalized meal based on your health plans.",
  "Chat with our AI Assistant for more information.",
  "Budget bite is now available for all users.",
]);

const timeOfDay = computed(() => {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  return "evening";
});

const userName = computed(() => {
  return user.value?.displayName || user.value?.email || "User";
});

const modalOpen = ref(false);

const toSettings = () => {
  setActiveTab(4);
  router.push("/settings");
};
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
