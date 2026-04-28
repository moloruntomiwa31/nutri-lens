<template>
  <div class="flex flex-col h-[calc(100vh-120px)] max-w-5xl mx-auto animate-fade-in">
    <!-- Chat Content -->
    <div class="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-hide" id="chat-container">
      <div
        v-if="messages.length === 0"
        class="h-full flex flex-col items-center justify-center text-center space-y-6 max-w-md mx-auto"
      >
        <div class="relative">
          <div class="absolute inset-0 bg-primaryGreen/20 rounded-full blur-3xl animate-pulse"></div>
          <img src="/images/ai.png" alt="AI Assistant" class="w-64 h-64 relative z-10 drop-shadow-2xl" />
        </div>
        <div class="space-y-2">
          <BaseHeading as="h1" size="3xl" weight="bold" class="text-gray-900 after:hidden !mb-0">Dr. Nutri AI</BaseHeading>
          <p class="text-gray-500 leading-relaxed">
            Your personalized nutritional expert. Ask me about meal plans, calories, or how to reach your health goals.
          </p>
        </div>
        <div class="flex flex-wrap justify-center gap-2 pt-4">
          <button 
            v-for="suggestion in ['Healthy breakfast ideas?', 'How much protein do I need?', 'Benefits of kale?']" 
            :key="suggestion"
            @click="question = suggestion; getAiResponse(suggestion)"
            class="px-4 py-2 rounded-full bg-white border border-gray-100 text-xs font-bold text-secondaryGreen hover:bg-primaryGreen hover:text-white transition-all shadow-sm"
          >
            {{ suggestion }}
          </button>
        </div>
      </div>

      <div v-else class="space-y-6">
        <TransitionGroup name="message">
          <div 
            v-for="(message, index) in messages" 
            :key="index"
            class="flex flex-col"
            :class="message.role === 'user' ? 'items-end' : 'items-start'"
          >
            <div 
              class="max-w-[85%] md:max-w-[70%] rounded-3xl p-5 shadow-sm"
              :class="[
                message.role === 'user' 
                  ? 'bg-secondaryGreen text-white rounded-tr-none' 
                  : 'bg-white border border-gray-50 text-gray-800 rounded-tl-none'
              ]"
            >
              <div class="flex items-center gap-2 mb-2">
                <div 
                  class="w-6 h-6 rounded-lg flex items-center justify-center"
                  :class="message.role === 'user' ? 'bg-white/20' : 'bg-primaryGreen/10'"
                >
                  <Icon :name="message.role === 'user' ? 'heroicons:user' : 'ion:nutrition'" size="14" :class="message.role === 'user' ? 'text-white' : 'text-primaryGreen'" />
                </div>
                <span class="text-[10px] font-bold uppercase tracking-widest opacity-60">
                  {{ message.role === 'user' ? 'You' : 'Dr. Nutri' }}
                </span>
              </div>
              <p class="text-sm leading-relaxed whitespace-pre-wrap">{{ message.content }}</p>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>

    <!-- Input Bar -->
    <div class="p-4 md:p-8 pt-0">
      <div class="glass-morphism rounded-[2.5rem] p-2 border border-white/50 shadow-2xl shadow-black/5">
        <form @submit.prevent="handleChat" class="flex items-center gap-2">
          <div class="flex-1 relative">
            <input
              type="text"
              placeholder="Ask Dr. Nutri anything..."
              class="w-full bg-transparent border-none outline-none p-4 pl-6 text-gray-900 placeholder:text-gray-400 font-medium"
              v-model.trim="question"
              :disabled="isLoading"
            />
          </div>
          <button
            type="submit"
            :disabled="!question || isLoading"
            class="w-12 h-12 rounded-2xl bg-secondaryGreen text-white flex items-center justify-center hover:bg-secondaryGreen/90 disabled:opacity-50 disabled:hover:scale-100 transition-all shadow-lg shadow-secondaryGreen/20 transform hover:scale-105 active:scale-95"
          >
            <Icon v-if="!isLoading" name="heroicons:paper-airplane" size="20" class="rotate-90" />
            <Icon v-else name="line-md:loading-twotone-loop" size="20" />
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { getAiResponse, question, messages, isLoading } = useChat();

const handleChat = async () => {
  if (!question.value || isLoading.value) return;
  const q = question.value;
  question.value = "";
  await getAiResponse(q);
  
  // Scroll to bottom
  nextTick(() => {
    const container = document.getElementById('chat-container');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  });
};

definePageMeta({
  layout: "dashboard",
});

useHead({
  title: "AI Chat Assistant | Nutri-Lens",
});
</script>

<style scoped>
.glass-morphism {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.message-enter-active,
.message-leave-active {
  transition: all 0.4s ease;
}
.message-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.message-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

