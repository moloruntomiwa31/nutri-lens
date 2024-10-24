export default function useScreenObserver() {
  const isDesktopScreen = ref(false);
  const isTabletScreen = ref(false);
  const isMobileScreen = ref(false);

  const checkScreenSize = () => {
    const width = window.innerWidth;
    isDesktopScreen.value = width >= 1024;
    isTabletScreen.value = width >= 768 && width < 1024;
    isMobileScreen.value = width < 768;
  };

  onMounted(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", checkScreenSize);
  });

  return { isDesktopScreen, isTabletScreen, isMobileScreen };
}
