"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { PostDB } from "@/types/post";
import Link from "next/link";

const PostPage = () => {
  const [posts, setPosts] = useState<PostDB[]>([]);
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>("");

  // fetch posts from /api/posts (GET)
  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts");
      const data: PostDB[] = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // create post
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !author.trim() || !description.trim()) {
      setError("Please fill all fields!");
      return;
    }

    setError("");

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author, description }),
      });

      const data = await res.json();
      setPosts((prev) => [...prev, data.post]);

      setTitle("");
      setAuthor("");
      setDescription("");
    } catch (err) {
      console.error("Failed to create post:", err);
    }
  };

  // delete post
  const deletePost = async (_id: string) => {
    try {
      await fetch(`/api/posts/${_id}`, { method: "DELETE" });
      setPosts((prev) => prev.filter((post) => post._id.toString() !== _id));
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Posts</h1>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
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
        <textarea
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full border p-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          Create Post
        </button>
      </form>

      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post._id} className="border p-4 rounded-lg shadow hover:shadow-md transition-shadow">
            <Link href={`db-posts/${post._id}`} className="font-bold text-lg hover:text-blue-600 transition-colors">
              <h2>{post.title}</h2>
            </Link>
            <p className="mt-1 text-white">Author: {post.author}</p>
            <p className="mt-1 text-white">{post.description}</p>

            <div className="flex gap-3 mt-4">
              {/* Edit Button */}
              <Link
                href={`/db-posts/${post._id}/edit`}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors shadow-sm"
              >
                Edit
              </Link>

              {/* Delete Button */}
              <button
                onClick={() => deletePost(post._id.toString())}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors shadow-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default PostPage;
