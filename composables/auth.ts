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

  const logIn = async (email: string, password: string) => {};
  const logOut = async () => {};

  return {
    user: store.value.user,
    isAuthenticated: store.value.isAuthenticated,
    token: store.value.token,
    signUp,
    logIn,
    logOut,
  };
};
