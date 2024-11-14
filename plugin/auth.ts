import { initializeFirebase } from '@/firebase';
export default defineNuxtPlugin(async () => {
  try {
    // Initialize Firebase first
    initializeFirebase();
    
    // Then initialize auth state
    const { initializeAuth } = useAuth();
    await initializeAuth();
  } catch (error) {
    console.error('Failed to initialize Firebase and auth:', error);
  }
});