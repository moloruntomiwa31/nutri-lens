import { getAuth } from "firebase-admin/auth";
import { createError } from "h3";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { token } = body;

    if (!token) {
      throw createError({
        statusCode: 400,
        message: "Token is required",
      });
    }

    // Get runtime config and initialize admin SDK
    const config = useRuntimeConfig();

    if (!config.vuefire?.admin?.app) {
      throw createError({
        statusCode: 500,
        message: "Firebase Admin not properly initialized",
      });
    }

    const adminAuth = getAuth(config.vuefire.admin.app);

    // Verify ID token
    const decodedToken = await adminAuth.verifyIdToken(token);

    // Create session cookie
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await adminAuth.createSessionCookie(token, {
      expiresIn,
    });

    // Set the session cookie
    setCookie(event, "session", sessionCookie, {
      maxAge: expiresIn / 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });

    return {
      status: "success",
      message: "Session created successfully",
    };
  } catch (error: any) {
    console.error("Session creation error:", error);

    throw createError({
      statusCode: 500,
      message: `Error creating session: ${error.message}`,
    });
  }
});
