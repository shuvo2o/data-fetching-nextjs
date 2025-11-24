import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Post from "@/app/models/Post";
import mongoose from "mongoose";
interface Params {
  params: { id: string };
}

// GET single post by id
export async function GET(req: Request, { params }: Params) {
  try {
    await connectDB();

    const { id } = params;

    const post = await Post.findById(id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}

// DELETE post by id
export async function DELETE(req: Request, { params }: Params) {
  try {
    await connectDB();

    const { id } = params;

    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Post deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}

// update post 
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();

    // unwrap params if it's a Promise
    const { id } = await params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid post id" }, { status: 400 });
    }

    const body = await req.json(); // ✅ call json() function

    const { title, author, description } = body;

    if (!title || !author || !description) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, author, description },
      { new: true }
    );

    if (!updatedPost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Post updated successfully", post: updatedPost });
  } catch (err: any) {
    console.error("PUT /api/posts/[id] error:", err);
    return NextResponse.json({ message: "Failed to update post", error: err.message }, { status: 500 });
  }
}


