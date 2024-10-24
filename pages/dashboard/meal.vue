<template>
  <div class="flex items-center justify-center h-full mt-4">
    <div
      class="bg-grayColor rounded-lg w-4/5 md:w-[600px] lg:w-[700px] xl:w-[800px] h-[500px] p-6"
    >
      <div class="flex items-center justify-center">
        <template v-for="(option, index) in steps" :key="option.id">
          <div class="flex items-center">
            <a
              :class="[
                'flex items-center gap-2 cursor-pointer',
                {
                  'text-secondaryGreen': option.done,
                  'text-primaryPurple':
                    currentTab.id === option.id && !option.done,
                  'text-black': !option.done && currentTab.id !== option.id,
                },
              ]"
              @click="currentTab = option"
            >
              <span
                class="w-8 h-8 rounded-full flex items-center justify-center bg-white shadow"
              >
                <Icon
                  size="24"
                  name="lets-icons:check-fill"
                  v-if="option.done"
                />
                <span v-else class="font-bold">{{ index + 1 }}</span>
              </span>
              <span class="text-sm font-medium hidden md:block">{{
                option.name
              }}</span>
            </a>
          </div>
          <span
            v-if="index < steps.length - 1"
            class="w-20 h-0.5 bg-primaryPurple mx-2 rounded-full"
          />
        </template>
      </div>

      <template v-if="currentTab.detail === 'upload'">
        <div class="flex flex-col items-center justify-center gap-4 py-2 h-4/5">
          <div
            class="flex items-center justify-center w-11/12 h-[300px] bg-lightGray rounded-xl"
          >
            <BaseFileInput accept=".jpg, .png" v-model="image">
              <Icon
                name="flowbite:upload-solid"
                :size="imageUrl ? 50 : 100"
              />
            </BaseFileInput>
          </div>
          <span class="text-base text-center"
            >Upload a picture of a meal you'll like to analyze.</span
          >
          <div v-if="imageUrl" class="mt-4">
            <img
              :src="imageUrl"
              alt="Image Preview"
              class="rounded-lg h-48 w-full object-cover"
            />
          </div>
        </div>
      </template>
      <template v-if="currentTab.detail === 'result'">
        <div class="h-4/5">
          <h2 class="text-xl font-bold">Result</h2>
          <div>
            <div class="flex items-center justify-between">
              <span class="text-lg font-medium">Calories</span>
              <span class="font-medium">200</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-lg font-medium">Protein</span>
              <span class="font-medium">20g</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-lg font-medium">Carbs</span>
              <span class="font-medium">30g</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-lg font-medium">Fat</span>
              <span class="font-medium">10g</span>
            </div>
          </div>
          <div>
            <h3 class="text-lg font-bold mt-4">Recommendation</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
              ducimus deserunt quidem. Porro accusamus fugit temporibus ea
              atque, quos maxime!
            </p>
          </div>
        </div>
      </template>
      <template
        v-if="currentTab.detail === 'result' || currentTab.detail === 'upload'"
      >
        <div class="flex justify-end w-full">
          <BaseButton
            :shadow="true"
            :color="currentTab.detail === 'result' ? 'green' : 'blue'"
            customClass="rounded-lg"
            >{{
              currentTab.detail === "result" ? "Done" : "Continue"
            }}</BaseButton
          >
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});

const steps = [
  {
    id: 1,
    name: "Upload",
    detail: "upload",
    done: false,
  },
  {
    id: 2,
    name: "Result",
    detail: "result",
    done: false,
  },
];

const image = ref<File | null>(null);
const imageUrl = ref<string | null>(null);
const currentTab = ref(steps[0]);

watch(image, (newImage) => {
  if (newImage) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imageUrl.value = e.target?.result as string;
    };
    reader.readAsDataURL(newImage);
  } else {
    imageUrl.value = null;
  }
});
</script>
