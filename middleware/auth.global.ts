// middleware/auth.global.ts
import { useAuthStore } from "~/plugins/firebase"
// Define route groups
const publicRoutes = ['/']
const authRoutes = ['/auth/login', '/auth/sign-up']
const plansRequiredRoutes = ['/dashboard/']

export default defineNuxtRouteMiddleware(async (to) => {
  // Skip middleware on server side
  if (process.server) return

  // Get auth store
  const store = useAuthStore()
  const authInitialized = useState('authInitialized')

  // Wait for auth to be initialized
  if (!authInitialized.value) {
    return
  }

  const currentPath = to.path

  // Allow access to public routes
  if (publicRoutes.includes(currentPath)) {
    return
  }

  // Handle non-authenticated users
  if (!store.value.isAuthenticated) {
    // Allow access to auth routes
    if (authRoutes.includes(currentPath)) {
      return
    }
    // Redirect to login for all other routes
    return navigateTo('/auth/login')
  }

  // Handle authenticated users
  if (store.value.isAuthenticated) {
    // Don't allow access to auth routes when authenticated
    if (authRoutes.includes(currentPath)) {
      return navigateTo('/dashboard/')
    }

    // If we don't have user data yet, redirect to login
    if (!store.value.userData) {
      return navigateTo('/auth/login')
    }

    // Handle plans completion routing
    if (!store.value.userData.hasCompletedPlans) {
      // Allow access to plans page
      if (currentPath === '/plans') {
        return
      }
      
      // Redirect to plans page if trying to access dashboard
      if (plansRequiredRoutes.includes(currentPath)) {
        return navigateTo('/plans')
      }
    } else {
      // If plans are completed, don't allow access to plans page
      if (currentPath === '/plans') {
        return navigateTo('/dashboard/')
      }
    }
  }
})