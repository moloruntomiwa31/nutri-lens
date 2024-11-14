<template>
  <NuxtLoadingIndicator :throttle="0" :height="5" />
  <BaseToast />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
// const router = useRouter();
// const route = useRoute();
// const user = useCurrentUser();

// // we don't need this watcher on server
// onMounted(() => {
//   watch(user, (user, prevUser) => {
//     if (prevUser && !user) {
//       // user logged out
//       router.push("/auth/login");
//     } else if (user && typeof route.query.redirect === "string") {
//       // user logged in
//       router.push(route.query.redirect);
//     }
//   });
// });
</script>
