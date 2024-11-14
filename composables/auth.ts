import type { User } from "firebase/auth";
import {
  getIdToken,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  getAuth,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import type UserFormData from "@/types/UserFormData";
import { getFirebaseAuth, getFirebaseDb } from '@/firebase';


interface UserData {
  firstName: string;
  lastName: string;
  hasCompletedPlans: boolean;
}

interface AuthStore {
  isAuthenticated: boolean;
  currentUser: User | null;
  token: string | null;
  userData: UserData | null;
  isAuthLoading: boolean;
}

const store = ref<AuthStore>({
  isAuthenticated: false,
  currentUser: null,
  token: null,
  userData: null,
  isAuthLoading: true,
});

export const useAuth = () => {
  const router = useRouter();
  const auth = getFirebaseAuth();
  const db = getFirebaseDb();
  const { addToast } = useToast();

  const setSessionCookie = async (token: string): Promise<void> => {
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
  ): Promise<void> => {
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

  const fetchUserData = async (uid: string): Promise<void> => {
    try {
      const userRef = doc(db, "users", uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        store.value.userData = userDoc.data() as UserData;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  const handleAuthSuccess = async (user: User): Promise<void> => {
    try {
      store.value.currentUser = user;
      store.value.isAuthenticated = true;
      const token = await getIdToken(user);
      store.value.token = token;

      await setSessionCookie(token);
      await fetchUserData(user.uid);

      const redirectPath = store.value.userData?.hasCompletedPlans
        ? "/dashboard/"
        : "/plans";

      await router.push(redirectPath);
    } catch (error) {
      addToast("Error setting up session", "error");
      throw error;
    }
  };

  const initializeAuth = async (): Promise<void> => {
    return new Promise<void>((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        try {
          store.value.isAuthLoading = true;

          if (user) {
            store.value.currentUser = user;
            store.value.isAuthenticated = true;
            const token = await getIdToken(user);
            store.value.token = token;
            await fetchUserData(user.uid);
          } else {
            store.value = {
              ...store.value,
              currentUser: null,
              isAuthenticated: false,
              token: null,
              userData: null,
            };
          }
        } catch (error) {
          console.error("Error in auth state change:", error);
          addToast("Error syncing auth state", "error");
        } finally {
          store.value.isAuthLoading = false;
          resolve();
        }

        if (process.server) {
          unsubscribe();
        }
      });
    });
  };

  const logIn = async (credentials: {
    email: string;
    password: string;
  }): Promise<void> => {
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      await handleAuthSuccess(user);
      addToast("Logged in successfully", "success");
    } catch (error) {
      addToast("Invalid email or password", "error");
      throw error;
    }
  };

  const signInWithGoogle = async (): Promise<void> => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      await saveUserToFirestore(user.uid, {
        email: user.email!,
        firstName: user.displayName?.split(" ")[0] || "",
        lastName: user.displayName?.split(" ").slice(1).join(" ") || "",
        hasCompletedPlans: false,
      });

      await handleAuthSuccess(user);
      addToast("Logged in successfully", "success");
    } catch (error) {
      addToast("Error signing in with Google", "error");
      throw error;
    }
  };

  const signUp = async (formData: UserFormData): Promise<void> => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await saveUserToFirestore(user.uid, {
        email: formData.email,
        firstName: formData.first_name,
        lastName: formData.last_name,
        hasCompletedPlans: false,
      });

      await handleAuthSuccess(user);
      addToast("Account created successfully", "success");
    } catch (error) {
      addToast("Error creating account.", "error");
      throw error;
    }
  };

  const logOut = async (): Promise<void> => {
    try {
      await auth.signOut();
      store.value = {
        ...store.value,
        currentUser: null,
        isAuthenticated: false,
        token: null,
        userData: null,
      };

      await $fetch("/api/auth/logout", { method: "POST" });
      addToast("Logged out successfully", "success");
      await router.push("/auth/login");
    } catch (error) {
      addToast("Error logging out", "error");
      throw error;
    }
  };

  const updatePlansCompletion = async (
    completed: boolean = true
  ): Promise<void> => {
    if (!store.value.currentUser?.uid) return;

    try {
      await saveUserToFirestore(store.value.currentUser.uid, {
        email: store.value.currentUser.email!,
        hasCompletedPlans: completed,
      });

      if (store.value.userData) {
        store.value.userData.hasCompletedPlans = completed;
      }

      await router.push("/dashboard");
    } catch (error) {
      addToast("Error updating plans completion status", "error");
      throw error;
    }
  };

  return {
    currentUser: store.value.currentUser,
    isAuthenticated: store.value.isAuthenticated,
    token: store.value.token,
    userData: store.value.userData,
    isAuthLoading: store.value.isAuthLoading,
    initializeAuth,
    signInWithGoogle,
    signUp,
    logIn,
    logOut,
    updatePlansCompletion,
  };
};
