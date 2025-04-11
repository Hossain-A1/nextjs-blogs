import { cookies } from "next/headers";
import { verifyToken } from "@/helper/jwt";
import { errorResponse } from "@/helper/response";

export const isLoggedIn = () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (accessToken) {
    try {
      const session = verifyToken(accessToken);
      if (session?._id) {
        return errorResponse({
          statusCode: 400,
          message: "You are already logged in.",
        });
      }
    } catch (err) {
    console.log(err.message);
    }
  }

  return null; // means user is not logged in, safe to proceed
};
