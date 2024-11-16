<template>
  <div class="relative">
    <div
      :class="[
        'p-3 rounded-lg mb-3 text-white grid grid-cols-[1fr_auto] gap-1 items-center',
        message.isUser ? 'bg-primaryBlue ml-auto' : 'bg-primaryPurple mr-auto',
      ]"
      style="max-width: 80%"
    >
      <BaseText>{{ message.content }}</BaseText>
      <BaseText size="xs">{{ message.time }}</BaseText>
    </div>
  </div>
</template>

<script setup lang="ts">
import type Message from "~/types/Message";
defineProps<{
  message: Message;
}>();
</script>

<style scoped>
.message-enter-active,
.message-leave-active {
  transition: opacity 0.5s ease;
}

.message-enter-from,
.message-leave-to {
  opacity: 0;
}
</style>
