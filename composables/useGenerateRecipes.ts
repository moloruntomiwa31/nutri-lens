import type UserHealth from "~/types/UserHealth";
import type RecipeResponse from "~/types/RecipeResponse";

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
    gender: "",
  } as UserHealth,
});
export default function useGenerateRecipes() {
  const router = useRouter();

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

  const generateRecipes = async () => {
    loading.value = true;
    error.value = null;

    try {
      if (hasErrors.value) {
        throw new Error("Please fix all validation errors before submitting");
      }

      const res = await $fetch<RecipeResponse>("/api/generate-recipes", {
        method: "POST",
        body: store.value.factory,
      });

      store.value.recipes.push(res);
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
  };
}
