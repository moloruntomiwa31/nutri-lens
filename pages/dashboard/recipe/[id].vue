<template>
  <div class="flex items-center justify-center h-full mt-4">
    <div
      class="border-2 border-grayColor rounded-lg w-11/12 md:w-[600px] lg:w-[700px] xl:w-[800px] p-4"
    >
      <div class="flex flex-col-reverse items-center gap-6">
        <!-- content -->
        <div class="space-y-10">
          <div class="header">
            <h2 class="font-bold text-3xl">Tasty Fried Chicken</h2>
            <div class="space-y-2">
              <p class="text-sm text-gray-500">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Accusamus nam, recusandae consequuntur error saepe alias
                provident sequi natus in omnis quod facilis totam necessitatibus
                iste perferendis voluptatibus esse ipsum minima, ducimus rerum
                quisquam officiis voluptatum quas pariatur? Fugit quia iste
                quaerat quidem voluptatum cupiditate aperiam dolor aspernatur
                eos rerum distinctio corporis at doloremque quam, esse
                praesentium laboriosam rem accusamus voluptatem?
              </p>
              <div class="info flex items-center justify-between">
                <div>
                  <h4 class="font-semibold text-xs">Preparation Time</h4>
                  <p class="text-gray-500">30 mins</p>
                </div>
                <div>
                  <h4 class="font-semibold text-xs">Difficulty</h4>
                  <p class="text-gray-500 flex items-center gap-1">
                    {{ RecipeDifficulty.Easy }}
                    <span>{{ difficultyEmojis[RecipeDifficulty.Easy] }}</span>
                  </p>
                </div>
                <div>
                  <h4 class="font-semibold text-xs">Ratings</h4>
                  <p class="text-gray-500">4/5</p>
                </div>
              </div>
            </div>
          </div>
          <!-- Rest of the template remains the same -->
          <div class="nutritional-facts">
            <h3 class="font-bold text-xl">Nutritional Facts</h3>
            <div class="flex items-center gap-4">
              <div>
                <h4 class="font-semibold text-xs">Calories</h4>
                <p class="text-gray-500 text-2xl">200</p>
              </div>
              <div>
                <h4 class="font-semibold text-xs">Protein</h4>
                <p class="text-gray-500 text-2xl">200</p>
              </div>
              <div>
                <h4 class="font-semibold text-xs">Fat</h4>
                <p class="text-gray-500 text-2xl">200</p>
              </div>
              <div>
                <h4 class="font-semibold text-xs">Carbs</h4>
                <p class="text-gray-500 text-2xl">200</p>
              </div>
            </div>
          </div>
          <div class="ingredients">
            <h3 class="font-bold text-xl">Ingredients</h3>
            <ul class="list-disc pl-5">
              <li class="mb-1">Chicken</li>
              <li class="mb-1">Salt</li>
              <li class="mb-1">Pepper</li>
              <li class="mb-1">Oil</li>
              <li class="mb-1">Flour</li>
            </ul>
          </div>
          <div class="instructions">
            <h3 class="font-bold text-xl">Instructions</h3>
            <ol class="list-decimal pl-5">
              <li class="mb-1">Step 1: Lorem ipsum dolor sit amet.</li>
              <li class="mb-1">Step 2: Lorem ipsum dolor sit amet.</li>
              <li class="mb-1">Step 3: Lorem ipsum dolor sit amet.</li>
            </ol>
          </div>
          <div class="recommendations-healthBenefits">
            <h3 class="font-bold text-xl">Recommendations</h3>
            <p class="text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
              quod, voluptates, quae, quibusdam quia quos quidem voluptatum
              doloribus nemo doloremque quas. Quisquam, quidem. Quisquam
              voluptates, quidem quos quas quae.
            </p>
            <h3 class="font-bold text-xl">Health Benifits</h3>
            <p class="text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
              quod, voluptates, quae, quibusdam quia quos quidem voluptatum
              doloribus nemo doloremque quas. Quisquam, quidem. Quisquam
              voluptates, quidem quos quas quae.
            </p>
          </div>
        </div>
        <!-- Image -->
        <div class="">
          <img
            src="/public/images/auth/auth.jpg"
            class="w-full h-64 object-cover rounded-lg shadow-lg"
            alt="Recipe Image"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Recipe || Tasty Fried Chicken",
  meta: [
    {
      name: "description",
      content: "Discover healthy recipes and meal plans",
    },
  ],
});
useSeoMeta({
  title: "Recipe || Tasty Fried Chicken",
  description: "Discover healthy recipes and meal plans",
  ogDescription: "Discover healthy recipes and meal plans",
  ogTitle: "Recipe || Tasty Fried Chicken",
  ogImage: "/images/nutri-lens.png",
})
enum RecipeDifficulty {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard",
}

const difficultyEmojis = {
  [RecipeDifficulty.Easy]: "😋",
  [RecipeDifficulty.Medium]: "😅",
  [RecipeDifficulty.Hard]: "😰",
};

definePageMeta({
  layout: "dashboard",
});
</script>

<style scoped></style>
