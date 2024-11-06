export default defineNuxtRouteMiddleware(async (to) => {
  const user = await getCurrentUser();
  const publicRoutes = ["/auth/login", "/auth/sign-up"];
  const onboardingRoute = "/plans";

  // Handle unauthenticated users
  if (!user && !publicRoutes.includes(to.path)) {
    return navigateTo({
      path: "/auth/login",
      query: {
        redirect: to.path !== onboardingRoute ? to.path : undefined,
      },
    });
  }

  // If user exists, check their onboarding status
  if (user) {
    const hasCompletedOnboarding =
      user.hasCompletedPlans || user.onboardingComplete; // adjust based on your user object structure

    // Prevent authenticated users from accessing auth pages
    if (publicRoutes.includes(to.path)) {
      return navigateTo("/dashboard/");
    }

    // If onboarding is not complete and user is not on plans page, redirect to plans
    if (!hasCompletedOnboarding && to.path !== onboardingRoute) {
      return navigateTo(onboardingRoute);
    }

    // If onboarding is complete and user tries to access plans page, redirect to dashboard
    if (hasCompletedOnboarding && to.path === onboardingRoute) {
      return navigateTo("/dashboard/");
    }
  }
});
