// server/middleware/auth.ts
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

export default defineEventHandler(async (event) => {
  const path = event.node.req.url || "/";
  const publicRoutes = ["/auth/login", "/auth/sign-up", "/"];
  const onboardingRoute = "/plans";
  const dashboardRoute = "/dashboard";

  // Skip middleware for assets and API routes
  if (
    path.startsWith("/api/") ||
    path.startsWith("/_nuxt/") ||
    path.includes(".")
  ) {
    return;
  }

  const authToken = getCookie(event, "session");

  // Handle unauthenticated users
  if (!authToken) {
    // Allow access to public routes
    if (publicRoutes.includes(path)) {
      return;
    }
    // Redirect to login for protected routes
    return sendRedirect(event, "/auth/login", 302);
  }

  // Handle authenticated users
  try {
    const adminAuth = getAuth(); // No need to pass app instance
    const adminDb = getFirestore(); // No need to pass app instance

    const decodedToken = await adminAuth.verifyIdToken(authToken);
    const userDoc = await adminDb
      .collection("users")
      .doc(decodedToken.uid)
      .get();

    if (!userDoc.exists) {
      deleteCookie(event, "session");
      return sendRedirect(event, "/auth/login", 302);
    }

    const userData = userDoc.data();
    const hasCompletedOnboarding = userData?.hasCompletedPlans || false;

    // Handle authenticated user accessing public routes
    if (publicRoutes.includes(path)) {
      if (!hasCompletedOnboarding) {
        return sendRedirect(event, onboardingRoute, 302);
      }
      return sendRedirect(event, dashboardRoute, 302);
    }

    // Handle onboarding route
    if (path === onboardingRoute) {
      if (hasCompletedOnboarding) {
        return sendRedirect(event, dashboardRoute, 302);
      }
      return; // Allow access to onboarding if not completed
    }

    // Handle other protected routes
    if (!hasCompletedOnboarding && path !== onboardingRoute) {
      return sendRedirect(event, onboardingRoute, 302);
    }

    // Allow access to all other routes for authenticated users with completed onboarding
    return;
  } catch (error) {
    console.error("Middleware error:", error);
    deleteCookie(event, "session");
    return sendRedirect(event, "/auth/login", 302);
  }
});
