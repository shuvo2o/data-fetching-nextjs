import mongoose,{ model, models, Schema } from "mongoose";

const PostSchema = new Schema({
  title: String,
  author: String,
  description: String,
},{
  timestamps:true
});

const Post = models.Post || model("Post", PostSchema);

export default Post;
