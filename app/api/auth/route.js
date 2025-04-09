import { incryptedPassword } from "@/helper/hashPassword";
import { errorResponse, successResponse } from "@/helper/response";
import { connectDB } from "@/lib/db";
import userModel from "@/schema/user.schema";

export const POST = async (req) => {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return errorResponse({
        statusCode: 400,
        message: "Please provide all fields data.",
      });
    }

    if (password.length < 6) {
      return errorResponse({
        statusCode: 400,
        message: "Password must be (6) char+ long.",
      });
    }
    // ✅ Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return errorResponse({
        statusCode: 400,
        message:
          "You have already registered. Please log in with your email and password.",
      });
    }

    const hashPass = await incryptedPassword(password);

    const data = { name, email, password: hashPass };
    await userModel.create(data);

    return successResponse({
      statusCode: 201,
      message: "Register was successed",
    });
  } catch (error) {
    console.log(error);
    return errorResponse({
      statusCode: 400,
      message: error.message,
    });
  }
};
