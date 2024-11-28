<template>
  <div class="flex flex-col h-[77vh] md:h-[80vh] lg:h-[90vh] max-h-screen">
    <div class="flex-grow overflow-y-auto p-4">
      <div
        v-if="messages.length === 0"
        class="flex flex-col items-center justify-center text-center"
      >
        <img src="/public/images/ai.png" alt="AI" class="w-80 h-80" />
        <BaseHeading as="h3" size="2xl" customClass="text-secondaryGreen"
          >Dr Nutri</BaseHeading
        >
        <BaseText>
          Hello I'm your AI Chat Assistant, ask me anything, I'm happy to
          help...
        </BaseText>
      </div>
      <TransitionGroup name="message" tag="div">
        <ChatMessages
          :message="message"
          v-for="message in messages"
          :key="message.content"
        />
      </TransitionGroup>
    </div>
    <form class="bg-grayColor p-4 flex gap-2 rounded-lg">
      <BaseInput
        placeholder="Enter the question"
        class="flex-grow p-4 rounded-md"
        v-model.trim="question"
      />
      <BaseButton
        type="submit"
        color="green"
        customClass="rounded-md"
        @click="getAiResponse(question)"
      >
        Ask
      </BaseButton>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});
const { getAiResponse, question, messages } = useChat();
</script>
