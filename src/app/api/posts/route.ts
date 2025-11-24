import { connectDB } from "@/app/lib/mongodb";
import Post from "@/app/models/Post";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const posts = await Post.find().lean(); 
    return NextResponse.json(posts, { status: 200 });

  } catch (error) {
    console.error("GET /api/posts error:", error);

    return NextResponse.json(
      { error: "Failed to load posts" },
      { status: 500 }
    );
  }
}

// create post 
export async function POST(request: Request){
    await connectDB();
    const body = await request.json();
    const newPost = await Post.create(body);
    return NextResponse.json({message: "Post created Succesfully", post:newPost})
}

// delete post
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    
    const { id } = params;

    await Post.findByIdAndDelete(id);

    return NextResponse.json({ message: "Post deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}