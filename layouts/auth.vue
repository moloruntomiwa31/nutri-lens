<template>
  <div class="min-h-screen w-full relative flex items-center justify-center p-6 overflow-hidden bg-light-bg">
    <!-- Premium Background Image -->
    <div class="absolute inset-0 z-0">
      <img
        src="/images/revamp/auth-bg.png"
        alt="Auth background"
        class="w-full h-full object-cover opacity-40 scale-105"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/40"></div>
    </div>

    <!-- Decorative blobs -->
    <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primaryGreen/10 rounded-full blur-[100px] animate-pulse"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondaryGreen/5 rounded-full blur-[100px] animate-pulse" style="animation-delay: 2s"></div>

    <!-- Content Slot -->
    <main class="relative z-10 w-full max-w-md">
      <div class="mb-8 text-center">
        <NuxtLink to="/" class="inline-flex items-center gap-2 group">
          <div class="w-10 h-10 rounded-xl bg-primaryGreen flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
            <Icon name="ion:nutrition" size="24" class="text-white" />
          </div>
          <span class="text-2xl font-bold text-gray-900 tracking-tight">Nutri-<span class="text-primaryGreen">Lens</span></span>
        </NuxtLink>
      </div>

      <div class="glass-morphism rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-black/5 border border-white/40">
        <slot />
      </div>

      <div class="mt-8 text-center">
        <p class="text-sm text-gray-400">© 2024 Nutri-Lens AI. Nourishing your potential.</p>
      </div>
    </main>
  </div>
</template>

<style scoped>
.glass-morphism {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
</style>

