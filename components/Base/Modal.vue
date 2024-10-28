<template>
  <Teleport to="#teleports">
    <Transition name="modal">
      <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div
          class="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-full max-w-md"
        >
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-bold">{{ title }}</h3>
            <button
              @click="closeModal"
              class="text-gray-500 hover:text-gray-800"
            >
              <Icon name="gg:close-o" size="30" style="color: red" />
            </button>
          </div>
          <slot></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();
const emit = defineEmits<{
  (e: "close"): void;
}>();
const open = ref(false);
const closeModal = () => {
  open.value = false;
  emit("close");
};
</script>

<style>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
