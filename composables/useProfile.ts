export default function useProfile() {
  const { user } = useAuth();
  const avatarImageUrl = useState<string>("avatar", () => user.value?.photoURL || "");
  const uploadImage = (file: File) => {
    avatarImageUrl.value = URL.createObjectURL(file);
  };
  return {
    avatarImageUrl,
    uploadImage,
  };
}
