import { errorResponse, successResponse } from "@/helper/response";
import { connectDB } from "@/lib/db";
import blogModel from "@/schema/blog.schema";

const POST = async (req) => {
  try {
    await connectDB();
    const { title, description, image } = await req.json();

    if (!title || !description || !image) {
      return errorResponse({
        statusCode: 400,
        message: "Please provide all fields data.",
      });
    }
    await blogModel.create({ title, description, image });

    return successResponse({
      statusCode: 201,
      message: "Blog was created successfully!",
    });
  } catch (error) {
    return errorResponse({ statusCode: 500, message: error.message });
  }
};

const GET = async (req) => {
  try {
    await connectDB();
    const blogs = await blogModel.find({});
    return successResponse({
      statusCode: 200,
      message: "Blog was reterued successfully!",
      payload: blogs,
    });
  } catch (error) {
    return errorResponse({ statusCode: 500, message: error.message });
  }
};

export { POST, GET };
