// plugins/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, getIdToken } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import type { User } from "firebase/auth";

// Move the store to a separate file so both plugin and composable can use it
// store/auth.ts
export const useAuthStore = () => {
  return useState<{
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
    userData: {
      firstName: string;
      lastName: string;
      hasCompletedPlans: boolean;
    } | null;
  }>("auth", () => ({
    isAuthenticated: false,
    user: null,
    token: null,
    userData: null,
  }));
};

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig();
  const store = useAuthStore();
  const authInitialized = useState("authInitialized", () => false);

  // Initialize Firebase config
  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseAuthDomain,
    projectId: config.public.firebaseProjectId,
    storageBucket: config.public.firebaseStorageBucket,
    messagingSenderId: config.public.firebaseMessagingSenderId,
    appId: config.public.firebaseAppId,
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  // Only run on client-side
  if (process.client) {
    // Create a promise to wait for initial auth state
    const authStateInitialized = new Promise<void>((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          try {
            // Get token
            const token = await getIdToken(firebaseUser);

            // Get user data
            const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));

            // Update store with all data
            store.value = {
              user: firebaseUser,
              isAuthenticated: true,
              token: token,
              userData: userDoc.exists()
                ? (userDoc.data() as typeof store.value.userData)
                : null,
            };

            // Set session cookie
            try {
              await $fetch("/api/auth/session", {
                method: "POST",
                body: { token },
              });
            } catch (error) {
              console.error("Error setting session:", error);
            }
          } catch (error) {
            console.error("Error initializing auth state:", error);
          }
        } else {
          // Reset store when not authenticated
          store.value = {
            isAuthenticated: false,
            user: null,
            token: null,
            userData: null,
          };
        }

        authInitialized.value = true;
        resolve();
        unsubscribe(); // Cleanup the listener after initial state is set
      });
    });

    // Wait for auth state to be initialized before app renders
    await authStateInitialized;
  }

  return {
    provide: {
      firebase: {
        app,
        auth,
        db,
      },
    },
  };
});
