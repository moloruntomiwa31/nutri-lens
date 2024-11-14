export default function useProfile() {
  const { currentUser } = useAuth();
  const avatarImageUrl = useState<string>("avatar", () => currentUser?.photoURL || "");
  const uploadImage = (file: File) => {
    avatarImageUrl.value = URL.createObjectURL(file);
  };
  return {
    avatarImageUrl,
    uploadImage,
  };
}
