import type UserHealth from "~/types/UserHealth";
import type RecipeResponse from "~/types/RecipeResponse";
import { doc, setDoc, getDoc } from "firebase/firestore";

const store = ref({
  recipes: [] as RecipeResponse[],
  loading: false,
  factory: {
    weight: "",
    weightUnit: "kg",
    height: "",
    heightUnit: "cm",
    age: "",
    disease: "",
    gender: "Male",
  } as UserHealth,
});

export default function useGenerateRecipes() {
  const router = useRouter();
  const db = useFirestore();
  const { user, updatePlansCompletion } = useAuth();
  const { isMinimumLength } = useValidators();

  const errors = computed(() => {
    const weightError = isMinimumLength(store.value.factory.weight);
    const heightError = isMinimumLength(store.value.factory.height);
    const ageError = isMinimumLength(store.value.factory.age);
    const diseaseError = isMinimumLength(store.value.factory.disease, 6);

    return {
      weight: weightError,
      height: heightError,
      age: ageError,
      disease: diseaseError,
    };
  });

  const hasErrors = computed(() =>
    Object.values(errors.value).some((error) => error !== "")
  );

  const loading = ref(false);
  const error = ref<string | null>(null);

  // Save health data to Firestore
  const saveHealthData = async (recipes: RecipeResponse[]) => {
    if (!user?.uid) {
      throw new Error("No authenticated user found");
    }

    try {
      const userHealthRef = doc(db, "users", user.uid);

      await setDoc(
        userHealthRef,
        {
          health: {
            ...store.value.factory,
            updatedAt: new Date(),
          },
          recipes: recipes,
          updatedAt: new Date(),
        },
        { merge: false } 
      );

      // Update plans completion status
      await updatePlansCompletion(true);
    } catch (error) {
      throw error;
    }
  };

  // Update the fetchHealthData function
  const fetchHealthData = async () => {
    if (!user?.uid) return false;

    loading.value = true;
    error.value = null;

    try {
      const userHealthRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userHealthRef);

      if (userDoc.exists() && userDoc.data().health) {
        const healthData = userDoc.data().health;
        store.value.factory = {
          ...store.value.factory, // Keep default values as fallback
          ...healthData, // Override with stored values
        };

        if (userDoc.data().recipes) {
          store.value.recipes = userDoc.data().recipes;
        }
        return true;
      }
      return false;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to fetch health data";
      return false;
    } finally {
      loading.value = false;
    }
  };

  // Update the onMounted hook
  onMounted(async () => {
    await fetchHealthData();
  });

  watch(
    () => store.value.factory.weightUnit,
    (newUnit, oldUnit) => {
      if (!store.value.factory.weight) return;

      const value = Number(store.value.factory.weight);
      if (isNaN(value)) return;

      if (newUnit === "kg" && oldUnit === "g") {
        store.value.factory.weight = (value / 1000).toString();
      } else if (newUnit === "g" && oldUnit === "kg") {
        store.value.factory.weight = (value * 1000).toString();
      }
    }
  );

  watch(
    () => store.value.factory.heightUnit,
    (newUnit, oldUnit) => {
      if (!store.value.factory.height) return;

      const value = Number(store.value.factory.height);
      if (isNaN(value)) return;

      if (newUnit === "cm" && oldUnit === "m") {
        store.value.factory.height = (value * 100).toString();
      } else if (newUnit === "m" && oldUnit === "cm") {
        store.value.factory.height = (value / 100).toString();
      }
    }
  );

  const generateRecipes = async (factory: UserHealth) => {
    loading.value = true;
    error.value = null;
    store.value.factory = factory;

    try {
      if (hasErrors.value) {
        throw new Error("Please add datas to all fields");
      }

      const res = await $fetch<RecipeResponse>("/api/generate-recipes", {
        method: "POST",
        body: store.value.factory,
      });

      // Replace the existing recipes with the new one
      store.value.recipes = [res];

      // Save health data and recipes to Firestore
      await saveHealthData(store.value.recipes);

      router.push("/dashboard/");
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to generate recipes";
    } finally {
      loading.value = false;
    }
  };

  return {
    factory: store.value.factory,
    errors,
    loading,
    error,
    generateRecipes,
    recipes: store.value.recipes,
    fetchHealthData,
  };
}
