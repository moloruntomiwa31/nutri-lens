import type UserHealth from "~/types/UserHealth";
import type RecipeResponse from "~/types/RecipeResponse";

const store = ref({
  recipes: [] as RecipeResponse[],
  loading: false,
});
export default function useGenerateRecipes() {
  const router = useRouter();
  const factory = ref<UserHealth>({
    weight: "",
    weightUnit: "kg",
    height: "",
    heightUnit: "cm",
    age: "",
    disease: "",
  });

  const { isMinimumLength } = useValidators();

  const errors = computed(() => ({
    weight: isMinimumLength(factory.value.weight),
    height: isMinimumLength(factory.value.height),
    age: isMinimumLength(factory.value.age),
    disease: isMinimumLength(factory.value.disease as string, 6),
  }));

  const loading = ref(false);
  const recipe = ref<RecipeResponse | null>(null);
  const error = ref<string | null>(null);

  watch(
    () => factory.value.weightUnit,
    (newUnit, oldUnit) => {
      if (!factory.value.weight) return;

      const value = Number(factory.value.weight);
      if (isNaN(value)) return;

      if (newUnit === "kg" && oldUnit === "g") {
        factory.value.weight = (value / 1000).toString();
      } else if (newUnit === "g" && oldUnit === "kg") {
        factory.value.weight = (value * 1000).toString();
      }
    }
  );

  watch(
    () => factory.value.heightUnit,
    (newUnit, oldUnit) => {
      if (!factory.value.height) return;

      const value = Number(factory.value.height);
      if (isNaN(value)) return;

      if (newUnit === "cm" && oldUnit === "m") {
        factory.value.height = (value * 100).toString();
      } else if (newUnit === "m" && oldUnit === "cm") {
        factory.value.height = (value / 100).toString();
      }
    }
  );

  const generateRecipes = async () => {
    loading.value = true;
    error.value = null;

    try {
      //   const hasErrors = Object.values(errors.value).some((error) => error);
      //   if (hasErrors) {
      //     throw new Error("Please fix all validation errors before submitting");
      //   }

      const res = await $fetch<RecipeResponse>("/api/generate-recipes", {
        method: "POST",
        body: factory.value,
      });

      store.value.recipes.push(res);
      console.log(store.value.recipes);
      router.push("/dashboard/");
    } catch (err) {
      console.error("Recipe generation error:", err);
      error.value =
        err instanceof Error ? err.message : "Failed to generate recipe";
    } finally {
      loading.value = false;
    }
  };

  return {
    factory,
    errors,
    loading,
    error,
    generateRecipes,
    recipes: store.value.recipes,
  };
}
