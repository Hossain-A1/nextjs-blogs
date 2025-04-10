import { connectDB } from "@/lib/db";

const { errorResponse, successResponse } = require("@/helper/response");
const { default: blogModel } = require("@/schema/blog.schema");


export const GET = async(req)=>{
  try {
await connectDB()
    const slugs = await blogModel.distinct("title")
    const slug = slugs.map((item)=>item.split(" ").join("-"))
    return successResponse({statusCode:200,message:"Slugs created",payload:slug})
  } catch (error) {
    return errorResponse({statusCode:500,message:error.message})
  }
}