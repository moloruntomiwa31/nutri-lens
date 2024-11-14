// server/api/auth/session.post.ts
export default defineEventHandler(async (event) => {
  const { token } = await readBody(event);
  
  // Set your session cookie here
  setCookie(event, 'session', token, {
    maxAge: 60 * 60 * 24 * 5, // 5 days
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  });

  return { success: true };
});