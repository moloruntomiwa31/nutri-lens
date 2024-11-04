interface Toast {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}
type ToastType = "success" | "error" | "info";

export const useToast = () => {
  const toasts = ref<Toast[]>([]);
  let id = 0;

  const removeToast = (id: number) => {
    const index = toasts.value.findIndex((t) => t.id === id);
    if (index > -1) {
      toasts.value.splice(index, 1);
    }
  };

  const addToast = (message: string, type: ToastType) => {
    const toast: Toast = {
      id: id++,
      message,
      type,
    };
    toasts.value.push(toast);
    setTimeout(() => {
      removeToast(toast.id);
    }, 3000);
  };

  return {
    toasts,
    addToast,
    removeToast,
  };
};
