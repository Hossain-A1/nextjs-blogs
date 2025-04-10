import { errorResponse, successResponse } from "@/helper/response";
import { connectDB } from "@/lib/db";
import blogModel from "@/schema/blog.schema";
import mongoose from "mongoose";
const isMongoId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};
const PUT = async (req, { params }) => {
  try {
    await connectDB();
    const { title, description, image } = await req.json();

    if (!title || !description || !image) {
      return errorResponse({
        statusCode: 400,
        message: "Please provide all fields data.",
      });
    }

    const id = await params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return errorResponse({
        statusCode: 403,
        message: "Invalid mongodb _id",
      });
    }

    await blogModel.findByIdAndUpdate(
      id,
      { title, description, image },
      { new: true }
    );

    return successResponse({
      statusCode: 200,
      message: "Blog was updated successfully!",
    });
  } catch (error) {
    return errorResponse({ statusCode: 500, message: error.message });
  }
};

const DELETE = async (req, { params }) => {
  try {
    await connectDB();

    const id = await params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return errorResponse({
        statusCode: 403,
        message: "Invalid mongodb _id",
      });
    }

    await blogModel.findByIdAndDelete(id);

    return successResponse({
      statusCode: 200,
      message: "Blog was deleted successfully!",
    });
  } catch (error) {
    return errorResponse({ statusCode: 500, message: error.message });
  }
};

const GET = async (req, { params }) => {
  try {
    await connectDB();

    const id = isMongoId(params.id);

    const query = id
      ? { _id: params.id }
      : { title: params.id.split("-").join(" ") };
    const blog = await blogModel.findOne(query);
    if (!blog) {
      return errorResponse({
        statusCode: 404,
        message: "Blog not foud with this query!",
      });
    }

    return successResponse({
      statusCode: 200,
      message: "Blog was deleted successfully!",
      payload: blog,
    });
  } catch (error) {
    return errorResponse({ statusCode: 500, message: error.message });
  }
};
export { PUT, DELETE, GET };
