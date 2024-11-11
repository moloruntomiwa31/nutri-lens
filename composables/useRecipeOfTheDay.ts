import type RecipeResponse from "~/types/RecipeResponse";
import { doc, setDoc, getDoc } from "firebase/firestore";
const store = ref({
  recipe: {} as RecipeResponse,
  loading: false,
  error: "",
});

export default function useRecipeOfTheDay() {
  const db = useFirestore();
  const { user } = useAuth();
  const generateRecipeOfTheDay = async () => {
    store.value.loading = true;
    try {
      const res = await $fetch<RecipeResponse>("/api/recipe-of-the-day", {
        method: "POST",
      });
      store.value.recipe = res;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        await setDoc(
          userRef,
          {
            recipeOfTheDay: {
              ...store.value.recipe,
              date: new Date().toISOString().split("T")[0],
            },
          },
          { merge: false }
        );
      }
    } catch (err) {
      store.value.error =
        err instanceof Error
          ? err.message
          : "Failed to fetch recipe of the day";
      console.log(store.value.error);
    } finally {
      store.value.loading = false;
    }
  };

  const getRecipe = async () => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists() && userDoc.data().recipeOfTheDay) {
        store.value.recipe = userDoc.data().recipeOfTheDay;
      }
    }
  }

  onMounted(async () => {
    await getRecipe();
  });

  return {
    generateRecipeOfTheDay,
    recipe: store.value.recipe,
    loading: store.value.loading,
    error: store.value.error,
  };
}
