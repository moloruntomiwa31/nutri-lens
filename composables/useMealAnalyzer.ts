export interface MealAnalysisResult {
  ingredients?: string[];
  calories?: string;
  protein?: string;
  carbs?: string;
  fat?: string;
  healthBenefits?: string;
  concerns?: string;
  recommendation?: string;
}

export interface AnalyzerStep {
  id: number;
  name: string;
  detail: "upload" | "result";
  done: boolean;
}

export default function useMealAnalyzer() {
  const fileInput = ref<HTMLInputElement | null>(null);
  const image = ref<File | null>(null);
  const imageUrl = ref<string | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const result = ref<MealAnalysisResult | null>(null);

  const steps = ref<AnalyzerStep[]>([
    { id: 1, name: "Upload", detail: "upload", done: false },
    { id: 2, name: "Result", detail: "result", done: false },
  ]);

  const currentStep = ref(steps.value[0]);

  const canProceedToNext = computed(() => {
    if (currentStep.value.detail === "upload") {
      return !!imageUrl.value && !isLoading.value && !error.value;
    }
    return false;
  });

  const setCurrentStep = (step: AnalyzerStep) => {
    if (step.detail === "result" && !steps.value[0].done) {
      return;
    }
    currentStep.value = step;
  };

  const handleImageSelection = (file: File) => {
    error.value = null;

    if (!file.type.startsWith("image/")) {
      error.value = "Please upload an image file";
      return;
    }

    // Check file size (5MB limit)
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      error.value = "Image file is too large. Maximum size is   5MB.";
      return;
    }

    image.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      imageUrl.value = e.target?.result as string;
    };
    reader.onerror = () => {
      error.value = "Failed to read image file. Please try again.";
      image.value = null;
      imageUrl.value = null;
    };
    reader.readAsDataURL(file);
  };

  const analyzeMeal = async (imageFile: File) => {
    if (!canProceedToNext.value) {
      return;
    }

    try {
      isLoading.value = true;
      error.value = null;
      result.value = null;

      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await $fetch("/api/analyze-meal", {
        method: "POST",
        body: formData,
      });

      if (!response || !response.response) {
        throw new Error("Invalid response from server");
      }

      result.value = response.response as MealAnalysisResult;
      steps.value[0].done = true;
      setCurrentStep(steps.value[1]);
      steps.value[1].done = true;
    } catch (err: any) {
      error.value = "Failed to analyze the image. Please try again.";
      result.value = null;
      steps.value[0].done = false;
    } finally {
      isLoading.value = false;
    }
  };

  const resetAnalyzer = () => {
    image.value = null;
    imageUrl.value = null;
    error.value = null;
    result.value = null;
    steps.value[0].done = false;
    steps.value[1].done = false;
    setCurrentStep(steps.value[0]);
    if (fileInput.value) {
      fileInput.value.value = "";
    }
  };

  return {
    fileInput,
    image,
    imageUrl,
    isLoading,
    error,
    result,
    steps,
    currentStep,
    canProceedToNext,
    setCurrentStep,
    handleImageSelection,
    analyzeMeal,
    resetAnalyzer,
  };
}
