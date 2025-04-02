<template>
  <div
    class="w-full h-screen flex flex-col-reverse lg:flex-row lg:justify-between lg:items-center overflow-hidden"
  >
    <div class="grid gap-12 py-3 place-items-start lg:w-2/5">
      <component :is="components[currentIndex].component" :key="currentIndex" />
      <div
        class="w-full flex justify-between lg:justify-start items-center gap-4 px-4 lg:px-12"
      >
        <BaseButton
          @click="handlePrevious"
          color="transparent"
          customClass="w-14 lg:w-8 h-14 lg:h-8 rounded-full border border-primaryGreen"
          :disabled="currentIndex === 0"
        >
          <Icon
            name="heroicons-solid:arrow-left"
            style="color: #a5b68d"
            size="30"
          />
        </BaseButton>
        <PaginationBullets :current="currentIndex" :total="components.length" />
        <BaseButton
          @click="handleNext"
          customClass="w-14 lg:w-8 h-14 lg:h-8 rounded-full"
        >
          <Icon
            name="heroicons-solid:arrow-right"
            style="color: white"
            size="30"
          />
        </BaseButton>
      </div>
    </div>
    <div class="landing-image-container h-full lg:w-3/5 relative">
      <img
        src="/images/landing/landing.jpg"
        alt="landing-image"
        class="landing-image object-cover w-full h-full"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Home",
  meta: [
    {
      name: "description",
      content: "Welcome to our meal AI analyzing platform.",
    },
  ],
});

useSeoMeta({
  title: "Home",
  description: "Welcome to our meal AI analyzing platform.",
  ogDescription: "Welcome to our meal AI analyzing platform.",
  ogTitle: "Home",
  ogImage: "/images/nutri-lens.png",
});

definePageMeta({
  layout: "landing",
});

const components = [
  {
    name: "welcome",
    title: "Welcome",
    component: defineAsyncComponent(
      () => import("@/components/Landing/Welcome.vue")
    ),
  },
  {
    name: "plans",
    title: "Personalized Plans",
    component: defineAsyncComponent(
      () => import("@/components/Landing/Plans.vue")
    ),
  },
  {
    name: "tracks",
    title: "Track & Achieve",
    component: defineAsyncComponent(
      () => import("@/components/Landing/Track.vue")
    ),
  },
  {
    name: "analyze",
    title: "Analyze Meal",
    component: defineAsyncComponent(
      () => import("@/components/Landing/Analyze.vue")
    ),
  },
  {
    name: "budget",
    title: "Budget",
    component: defineAsyncComponent(
      () => import("@/components/Landing/Budget.vue")
    ),
  },
];

const currentIndex = ref(0);

const handleNext = () => {
  if (currentIndex.value < components.length - 1) {
    currentIndex.value++;
  } else {
    navigateTo("/auth/login");
  }
};

const handlePrevious = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};

watch(currentIndex, (newIndex) => {
  if (newIndex === components.length) {
    navigateTo("/auth/login");
  }
});
</script>