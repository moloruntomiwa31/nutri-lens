<template>
  <div class="absolute top-14 right-4 z-[1000] flex flex-col gap-2">
    <TransitionGroup name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="[
          'px-4 py-3 rounded-lg shadow-lg max-w-md flex items-center gap-2',
          {
            'bg-secondaryGreen': toast.type === 'success',
            'bg-primaryRed': toast.type === 'error',
            'bg-primaryBlue': toast.type === 'info',
          },
        ]"
      >
        <ClientOnly>
          <Icon
            v-if="toast.type === 'success'"
            name="lets-icons:check-fill"
            class="cursor-pointer"
            style="color: white"
          />
          <Icon
            v-if="toast.type === 'error'"
            name="ic:sharp-error"
            class="cursor-pointer"
            style="color: white"
          />
          <Icon
            v-if="toast.type === 'info'"
            name="fa6-solid:info"
            class="cursor-pointer"
            style="color: white"
          />
        </ClientOnly>
        <BaseText customClass="text-white" weight="medium" size="sm">{{
          toast.message
        }}</BaseText>
        <ClientOnly>
          <Icon
            name="gg:close-o"
            size="20"
            class="ml-auto text-white hover:text-gray-200 cursor-pointer"
            @click="removeToast(toast.id)"
          />
        </ClientOnly>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
const { toasts, removeToast } = useToast();
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from,
.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.toast-enter-to,
.toast-leave-from {
  transform: translateX(0);
  opacity: 1;
}
</style>
