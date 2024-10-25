const store = ref({
  isAuthenticated: false,
  user: null,
  token: null,
});

export const useAuth = () => {
  const signUp = async (
    first_name: string,
    last_name: string,
    email: string,
    password: string
  ) => {};
  return {
    user: store.value.user,
    isAuthenticated: store.value.isAuthenticated,
    token: store.value.token,
    signUp,
  };
};
