<template>
  <div id="landing">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
@media screen and (min-width: 1024px) {
  #landing {
    background-image: url("/public/images/landing/bg.svg");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    height: 100vh;
    min-width: 100%;
  }
}
</style>
