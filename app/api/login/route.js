import { matchPassword } from "@/helper/hashPassword";
import { createToken, verifyToken } from "@/helper/jwt";
import { errorResponse, successResponse } from "@/helper/response";
import { connectDB } from "@/lib/db";
import { isLoggedIn } from "@/middleware/isLoggedIn";
import userModel from "@/schema/user.schema";

export const POST = async (req) => {
  try {
    const loggedin = isLoggedIn();
    if (loggedin) return loggedin;
    await connectDB();
    const body = await req.json();

    const { email, password } = body;

    if (!email || !password) {
      return errorResponse({
        statusCode: 400,
        message: "Please provide all filled data.",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return errorResponse({
        statusCode: 400,
        message: "User not exist with the email!",
      });
    }
    // ✅ match user password
    const isPasswordMatch = await matchPassword(password, user.password);

    if (!isPasswordMatch) {
      return errorResponse({
        statusCode: 400,
        message: "Invalid email or password!",
      });
    }

    const token = createToken({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
    const response = successResponse({
      statusCode: 200,
      message: "Login was successed",
    });

    response.cookies.set("accessToken", token.accessT, {
      httpOnly: true,
      secure: false,
      path: "/",
    });
    response.cookies.set("refreshToken", token.refreshT, {
      httpOnly: true,
      secure: false,
      path: "/",
    });

    const session = verifyToken(token.accessT);
    response.cookies.set("session", JSON.stringify(session), {
      maxAge: 7 * 24 * 60 * 60,
      secure: false,
      httpOnly: false,
      path: "/",
    });
    return response;
  } catch (error) {
    console.log(error);
    return errorResponse({
      statusCode: 400,
      message: error.message,
    });
  }
};
