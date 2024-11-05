export function useActiveTab() {
  const activeCookie = useCookie("activeTab", { default: () => 0 });
  const activeTab = useState("activeTab", () => activeCookie.value);
  const setActiveTab = (index: number) => {
    activeTab.value = index;
  };
  watch(
    activeTab,
    (newVal) => {
      activeCookie.value = newVal;
    },
    { immediate: true }
  );
  return {
    activeTab,
    setActiveTab,
  };
}
