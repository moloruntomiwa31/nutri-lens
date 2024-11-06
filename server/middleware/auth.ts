import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

export default defineEventHandler(async (event) => {
  const path = event.node.req.url || "/";
  const publicRoutes = ["/auth/login", "/auth/sign-up", "/"];
  const onboardingRoute = "/plans";

  if (
    path.startsWith("/api/") ||
    path.startsWith("/_nuxt/") ||
    path.includes(".")
  ) {
    return;
  }

  const authToken = getCookie(event, "session");

  if (!authToken && !publicRoutes.includes(path)) {
    return sendRedirect(event, "/auth/login", 302);
  }

  if (authToken) {
    try {
      const config = useRuntimeConfig();
      const adminApp = config.vuefire.admin.app;
      const adminAuth = getAuth(adminApp);
      const adminDb = getFirestore(adminApp);

      const decodedToken = await adminAuth.verifyIdToken(authToken);
      const userDoc = await adminDb
        .collection("users")
        .doc(decodedToken.uid)
        .get();
      const userData = userDoc.data();

      if (publicRoutes.includes(path)) {
        return sendRedirect(event, "/dashboard", 302);
      }

      const hasCompletedOnboarding = userData?.hasCompletedPlans || false;
      if (!hasCompletedOnboarding && path !== onboardingRoute) {
        return sendRedirect(event, onboardingRoute, 302);
      }
    } catch (error) {
      console.error("Error verifying session:", error);
      return sendRedirect(event, "/auth/login", 302);
    }
  }
});
