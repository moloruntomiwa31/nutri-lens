<template>
  <div class="relative mx-2" :class="[customClass]" ref="dropdown">
    <div
      @click="open = !open"
      class="cursor-pointer min-w-full p-2 rounded-lg flex items-center justify-between border border-primaryGreen shadow shadow-primaryGreen group-focus-within:border-primaryGreen"
      :class="open ? 'bg-grayColor text-secondaryGreen' : 'bg-lightGray text-black'"
    >
      <BaseText as="span" weight="bold">{{
        selectedOption || placeholder
      }}</BaseText>
      <Icon
        v-if="showArrow"
        name="stash:arrow-up-duotone"
        class="duration-100 transition font-bold"
        :class="{ 'rotate-180': open }"
        size="20"
      />
      <Transition name="dropdown">
        <div
          v-show="open"
          class="absolute z-10 top-10 bg-white shadow w-full rounded-lg"
        >
          <div
            v-for="option in options"
            :key="option"
            @click.stop="selectOption(option)"
            class="hover:cursor-pointer hover:bg-lightGray p-2 rounded-lg"
          >
            <BaseText as="span" customClass="ml-2">{{ option }}</BaseText>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
const {
  options = [],
  placeholder = "",
  customClass = "",
  showArrow = true,
} = defineProps<{
  options: string[];
  placeholder: string;
  customClass?: string;
  showArrow?: boolean;
}>();

const selectedOption = defineModel<string>("modelValue");
const open = ref(false);
const dropdown = ref<HTMLElement | null>(null);

const selectOption = (option: string) => {
  selectedOption.value = option;
  open.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
  if (dropdown.value && !dropdown.value.contains(event.target as Node)) {
    open.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.dropdown-enter-from {
  transform: translateY(100px);
}
.dropdown-enter-to {
  transform: translateY(0);
}
.dropdown-leave-from {
  opacity: 1;
}
.dropdown-leave-to {
  opacity: 0;
}
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.05s ease-in;
}
</style>
