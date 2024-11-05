interface Toast {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}
type ToastType = "success" | "error" | "info";

const store = ref({
  toasts: [] as Toast[],
});

export const useToast = () => {
  let id = 0;

  const removeToast = (id: number) => {
    const index = store.value.toasts.findIndex((t) => t.id === id);
    if (index > -1) {
      store.value.toasts.splice(index, 1);
    }
  };

  const addToast = (message: string, type: ToastType) => {
    const toast: Toast = {
      id: id++,
      message,
      type,
    };
    store.value.toasts.push(toast);
    setTimeout(() => {
      removeToast(toast.id);
    }, 3000);
  };

  return {
    toasts: store.value.toasts,
    addToast,
    removeToast,
  };
};
