// server/api/auth/logout.post.ts
export default defineEventHandler((event) => {
  deleteCookie(event, "session", {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  return { success: true };
});
