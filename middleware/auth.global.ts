import { getFirebaseAuth } from '@/firebase';

export default defineNuxtRouteMiddleware(async (to) => {
  const { userData, isAuthLoading } = useAuth();
  const auth = getFirebaseAuth();
  const user = auth.currentUser;

  const routes = {
    auth: ["/auth/login", "/auth/signup"],
    public: ["/"],
    dashboard: "/dashboard",
    plans: "/plans",
  };

  // Include auth routes in public routes
  routes.public.push(...routes.auth);

  // Wait for auth to initialize
  if (isAuthLoading) {
    return;
  }

  // Handle unauthenticated users
  if (!user) {
    return routes.public.includes(to.path)
      ? undefined
      : navigateTo("/auth/login");
  }

  // Handle authenticated users
  if (routes.auth.includes(to.path)) {
    return navigateTo(routes.dashboard);
  }

  // Handle onboarding flow
  const hasCompletedPlans = userData?.hasCompletedPlans;

  if (!hasCompletedPlans) {
    return to.path !== routes.plans ? navigateTo(routes.plans) : undefined;
  }

  // Redirect to dashboard if not already there
  return to.path !== routes.dashboard
    ? navigateTo(routes.dashboard)
    : undefined;
});
