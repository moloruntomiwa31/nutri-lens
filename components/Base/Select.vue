<template>
  <div class="relative mx-2">
    <div
      @click="open = !open"
      class="cursor-pointer bg-lightGray w-fit p-2 rounded-lg flex items-center border border-primaryGreen shadow shadow-primaryGreen group-focus-within:border-primaryGreen"
    >
      <span class="font-bold">{{ selectedOption || placeholder }}</span>
      <Icon
        name="stash:arrow-up-duotone"
        class="duration-100 transition font-bold"
        :class="{ 'rotate-180': open }"
        size="20"
      />
      <Transition name="dropdown">
        <div
          v-show="open"
          class="absolute z-10 top-10 bg-white w-[100px] rounded-lg"
        >
          <div
            v-for="option in options"
            :key="option"
            @click.stop="selectOption(option)"
            class="hover:cursor-pointer hover:bg-lightGray p-2 rounded-lg"
          >
            <span class="ml-2">{{ option }}</span>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
const { options = [], placeholder = "" } = defineProps<{
  options: string[];
  placeholder: string;
}>();

const selectedOption = defineModel<string>("modelValue");
const open = ref(false);
const selectOption = (option: string) => {
  selectedOption.value = option;
  open.value = false;
};
</script>

<style scoped>
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(100px);
}
.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s ease-in-out;
}
</style>
