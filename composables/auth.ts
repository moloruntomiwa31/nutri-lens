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

  // const createSession = async (user: User) => {
  //   try {
  //     // Get a fresh token
  //     const token = await user.getIdToken(true);

  //     // Create session
  //     const response = await $fetch("/api/auth/session", {
  //       method: "POST",
  //       body: { token },
  //     });

  //     if (response.status !== "success") {
  //       throw new Error("Failed to create session");
  //     }

  //     // Update store
  //     store.value.token = token;
  //     store.value.isAuthenticated = true;
  //   } catch (error) {
  //     console.error("Error setting auth cookie:", error);
  //     addToast("Error creating session. Please try again.", "error");
  //     throw error;
  //   }
  // };

  // Helper function to create/update user document in Firestore
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

  // Helper function to fetch user data from Firestore
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

  const signInWithGoogle = async () => {
    if (auth) {
      try {
        const result = await signInWithPopup(auth, new GoogleAuthProvider());
        store.value.user = result.user;
        store.value.isAuthenticated = true;
        store.value.token = await getIdToken(result.user);

        // Save Google user to Firestore if first time
        await saveUserToFirestore(result.user.uid, {
          email: result.user.email!,
          firstName: result.user.displayName?.split(" ")[0] || "",
          lastName:
            result.user.displayName?.split(" ").slice(1).join(" ") || "",
          hasCompletedPlans: false,
        });

        // Create session
        // await createSession(result.user);
        await fetchUserData(result.user.uid);
        addToast("Logged in successfully", "success");
        router.push(
          store.value.userData?.hasCompletedPlans ? "/dashboard" : "/plans"
        );
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

      store.value.user = userCredential.user;
      store.value.isAuthenticated = true;
      store.value.token = await getIdToken(userCredential.user);

      // Save user details to Firestore
      await saveUserToFirestore(userCredential.user.uid, {
        email: factory.email,
        firstName: factory.first_name,
        lastName: factory.last_name,
        hasCompletedPlans: false,
      });

      // Create session
      // await createSession(userCredential.user);
      await fetchUserData(userCredential.user.uid);
      addToast("Account created successfully", "success");
      router.push("/plans");
    } catch (error) {
      addToast("Error creating account.", "error");
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

      store.value.user = userCredential.user;
      store.value.isAuthenticated = true;
      store.value.token = await getIdToken(userCredential.user);

      // Create session
      // await createSession(userCredential.user);
      // Fetch user data from Firestore
      await fetchUserData(userCredential.user.uid);

      addToast("Logged in successfully", "success");

      // Redirect based on plans completion
      router.push(
        store.value.userData?.hasCompletedPlans ? "/dashboard" : "/plans"
      );
    } catch (error) {
      addToast("Invalid email or password", "error");
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
    } catch (error) {
      addToast("Error updating plans completion status", "error");
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
      // Clear session
      await $fetch("/api/auth/logout", { method: "POST" });
      addToast("Logged out successfully", "success");
      router.push("/auth/login");
    } catch (error) {
      addToast("Error logging out", "error");
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
