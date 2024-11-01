export default function useProfile() {
  const avatarImageUrl = useState<string>("avatar", () => "");
  const uploadImage = (file: File) => {
    avatarImageUrl.value = URL.createObjectURL(file);
  };
  return {
    avatarImageUrl,
    uploadImage,
  };
}
