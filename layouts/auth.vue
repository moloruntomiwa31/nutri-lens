<template>
  <div
    class="w-full h-screen flex flex-col lg:flex-row lg:justify-between items-center"
    id="auth"
  >
    <slot />
    <div class="auth-image-container h-full w-full hidden lg:block">
      <img
        src="/public/images/auth/auth.jpg"
        alt="auth-image"
        class="auth-image object-cover w-full h-full"
      />
    </div>
    <div class="fixed inset-0 w-full h-full z-[-1] lg:hidden">
      <img
        src="/public/images/top-left.svg"
        alt="under-cover"
        class="absolute top-0 left-0 w-1/2 h-1/2 object-cover"
      />
      <img
        src="/public/images/bottom-left.svg"
        alt="under-cover"
        class="absolute bottom-0 left-0 w-1/2 h-1/2 object-cover"
      />
      <img
        src="/public/images/bottom-right.svg"
        alt="under-cover"
        class="absolute bottom-0 right-0 w-1/2 h-1/2 object-cover"
      />
    </div>
  </div>
</template>

<style scoped>
@media screen and (min-width: 1024px) {
  #auth {
    background-image: url("/public/images/bg.svg");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    height: 100vh;
    min-width: 100%;
  }
}
</style>
