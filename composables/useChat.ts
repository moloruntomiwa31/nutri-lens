import type Message from "~/types/Message";

export default function useChat() {
  const question = ref("");
  const messages = ref<Message[]>([]);
  const isLoading = ref(false);

  const getAiResponse = async (message: string) => {
    isLoading.value = true;
    messages.value.push({
      content: message,
      isUser: true,
      time: new Date().toLocaleTimeString(),
    });

    try {
      const response = await $fetch<{ response: string }>("/api/ai-chat", {
        method: "POST",
        body: { message },
      });

      messages.value.push({
        content: response.response,
        isUser: false,
        time: new Date().toLocaleTimeString(),
      });

      isLoading.value = false;
      question.value = "";
    } catch (error) {
      console.error("Error getting AI response:", error);
      isLoading.value = false;
    }
  };

  return { question, getAiResponse, isLoading, messages };
}
