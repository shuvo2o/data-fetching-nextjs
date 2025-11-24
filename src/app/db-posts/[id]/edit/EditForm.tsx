"use client";

import React, { useState, FormEvent, useEffect } from "react";
import { PostDB } from "@/app/types/post";
import { useRouter } from "next/navigation";

interface EditFormProps {
  post?: PostDB | null;
}

const EditForm: React.FC<EditFormProps> = ({ post }) => {
  const [title, setTitle] = useState<string>(post?.title || "");
  const [author, setAuthor] = useState<string>(post?.author || "");
  const [description, setDescription] = useState<string>(post?.description || "");
  const [error, setError] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    if (post) {
      setTitle(post.title || "");
      setAuthor(post.author || "");
      setDescription(post.description || "");
    }
  }, [post]);

  if (!post) return <div className="p-6">Post not found</div>;

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !author.trim() || !description.trim()) {
      setError("Please fill all fields!");
      return;
    }

    setError("");

    try {
      await fetch(`/api/posts/${post._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author, description }),
      });

      alert("Post Updated Successfully");
      router.push("/db-posts"); // redirect to posts page
    } catch (err) {
      console.error(err);
      setError("Failed to update post");
    }
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-2 p-4 border rounded">
      {error && <p className="text-red-600">{error}</p>}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post Title"
        className="w-full border p-2"
      />
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author Name"
        className="w-full border p-2"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full border p-2"
      />
      <button
        type="submit"
        className="bg-green-600 text-white py-2 px-4 rounded"
      >
        Update Post
      </button>
    </form>
  );
};

export default EditForm;
