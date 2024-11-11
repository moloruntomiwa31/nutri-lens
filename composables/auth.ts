import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  getIdToken,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import type UserFormData from "@/types/UserFormData";
import type { User } from "firebase/auth";

const store = ref<{
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  userData: {
    firstName: string;
    lastName: string;
    hasCompletedPlans: boolean;
  } | null;
}>({
  isAuthenticated: false,
  user: null,
  token: null,
  userData: null,
});

export const useAuth = () => {
  const router = useRouter();
  const auth = useFirebaseAuth();
  const db = useFirestore();
  const { addToast } = useToast();

  const setSessionCookie = async (token: string) => {
    try {
      await $fetch("/api/auth/session", {
        method: "POST",
        body: { token },
      });
    } catch (error) {
      console.error("Error setting session:", error);
      throw error;
    }
  };

  const saveUserToFirestore = async (
    uid: string,
    data: {
      firstName?: string;
      lastName?: string;
      email: string;
      hasCompletedPlans: boolean;
    }
  ) => {
    try {
      const userRef = doc(db, "users", uid);
      await setDoc(
        userRef,
        {
          ...data,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error saving user to Firestore:", error);
      throw error;
    }
  };

  const fetchUserData = async (uid: string) => {
    try {
      const userRef = doc(db, "users", uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        store.value.userData = userDoc.data() as typeof store.value.userData;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  const handleAuthSuccess = async (user: User) => {
    try {
      store.value.user = user;
      store.value.isAuthenticated = true;
      const token = await getIdToken(user);
      store.value.token = token;

      // Set session cookie
      await setSessionCookie(token);
      await fetchUserData(user.uid);

      // Navigate based on onboarding status
      if (store.value.userData?.hasCompletedPlans) {
        router.push("/dashboard/");
      } else {
        router.push("/plans");
      }
    } catch (error) {
      addToast("Error setting up session", "error");
    }
  };

  const logIn = async (factory: { email: string; password: string }) => {
    try {
      if (!auth) {
        addToast("Firebase Auth instance is not initialized", "error");
        return;
      }

      const userCredential = await signInWithEmailAndPassword(
        auth,
        factory.email,
        factory.password
      );

      addToast("Logged in successfully", "success");
      await handleAuthSuccess(userCredential.user);
    } catch (error) {
      addToast("Invalid email or password", "error");
    }
  };

  const signInWithGoogle = async () => {
    if (auth) {
      try {
        const result = await signInWithPopup(auth, new GoogleAuthProvider());
        store.value.user = result.user;
        store.value.isAuthenticated = true;
        const token = await getIdToken(result.user);
        store.value.token = token;

        // Set session cookie
        await setSessionCookie(token);

        // Save Google user to Firestore if first time
        await saveUserToFirestore(result.user.uid, {
          email: result.user.email!,
          firstName: result.user.displayName?.split(" ")[0] || "",
          lastName:
            result.user.displayName?.split(" ").slice(1).join(" ") || "",
          hasCompletedPlans: false,
        });

        addToast("Logged in successfully", "success");
        await handleAuthSuccess(result.user);
      } catch (error) {
        addToast("Error signing in with Google", "error");
      }
    }
  };

  const signUp = async (factory: UserFormData) => {
    try {
      if (!auth) {
        addToast("Firebase Auth instance is not initialized", "error");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        factory.email,
        factory.password
      );

      await saveUserToFirestore(userCredential.user.uid, {
        email: factory.email,
        firstName: factory.first_name,
        lastName: factory.last_name,
        hasCompletedPlans: false,
      });

      addToast("Account created successfully", "success");
      await handleAuthSuccess(userCredential.user);
    } catch (error) {
      addToast("Error creating account.", "error");
    }
  };

  const logOut = async () => {
    try {
      if (!auth) {
        addToast("Firebase Auth instance is not initialized", "error");
        return;
      }

      await signOut(auth);
      store.value.user = null;
      store.value.isAuthenticated = false;
      store.value.token = null;
      store.value.userData = null;

      // Clear session cookie
      await $fetch("/api/auth/logout", { method: "POST" });
      addToast("Logged out successfully", "success");
      router.push("/auth/login");
    } catch (error) {
      addToast("Error logging out", "error");
    }
  };

  const updatePlansCompletion = async (completed: boolean = true) => {
    if (!store.value.user?.uid) return;

    try {
      await saveUserToFirestore(store.value.user.uid, {
        email: store.value.user.email!,
        hasCompletedPlans: completed,
      });

      if (store.value.userData) {
        store.value.userData.hasCompletedPlans = completed;
      }

      // Let middleware handle the redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      addToast("Error updating plans completion status", "error");
    }
  };

  return {
    user: store.value.user,
    userData: store.value.userData,
    isAuthenticated: store.value.isAuthenticated,
    token: store.value.token,
    signInWithGoogle,
    signUp,
    logIn,
    logOut,
    updatePlansCompletion,
  };
};
