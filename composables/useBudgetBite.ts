interface MealResult {
  breakfast: string[];
  lunch: string[];
  dinner: string[];
}
export default function useBudgetBite() {
  const mealBudget = ref({
    amount: "",
    currency: "NGN",
  });
  const loading = ref(false);
  const result = ref<MealResult | null>(null);
  const { isMinimumLength } = useValidators();
  const errors = computed(() => {
    const amountError = isMinimumLength(mealBudget.value.amount);
    return {
      amount: amountError,
    };
  });
  const generateMeals = async () => {
    loading.value = true;
    try {
      if (Object.values(errors.value).some((error) => error)) {
        loading.value = false;
        return;
      }
      const res = await $fetch<MealResult>("/api/generate-meal-from-amount", {
        method: "POST",
        body: mealBudget.value,
      });
      result.value = res as MealResult;
    } catch (err) {
      console.log(err);
    } finally {
      loading.value = false;
    }
  };
  return { mealBudget, generateMeals, errors };
}
