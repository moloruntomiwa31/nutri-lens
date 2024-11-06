export default function useValidators() {
  const isMinimumLength = (
    value: string | number,
    length: number = 1
  ): string => {
    if (!value && value !== 0) {
      return "input required";
    }

    const stringValue = value.toString();
    if (stringValue.length >= length) {
      return "";
    }

    return `min ${length} chars`;
  };

  const isValidEmail = (email: string): string => {
    if (!email) return "input required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "" : "Invalid email";
  };

  const isValidPassword = (password: string): string => {
    if (!password) return "input required";
    const minLengthError = isMinimumLength(password, 8);
    if (minLengthError) return minLengthError;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password)
      ? ""
      : "password must contain uppercase, lowercase, number and special character";
  };

  const samePasswordAs = (value: string, otherValue: string): string => {
    if (!value) return "input required";
    return value === otherValue ? "" : "Passwords do not match";
  };

  return { isMinimumLength, isValidEmail, isValidPassword, samePasswordAs };
}
