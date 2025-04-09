import  { model, models, Schema } from "mongoose";

const blogSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  image:{
    type:String,
    required:true
  }
},{timestamps:true});

const blogModel = models.blog || model("blog", blogSchema);
export default blogModel;
