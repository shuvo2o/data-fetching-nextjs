"use client";

import React, { useState, useEffect } from "react";

const PostPage = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  // load posts
  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  // create post
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !author.trim() || !description.trim()) {
      setError("Please fill all fields!");
      return;
    }

    setError("");

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
  };

  // delete post
  const deletePost = async (id) => {
    await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    // UI theke remove
    setPosts((prev) => prev.filter((post) => post._id !== id));
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

        <input
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
          <li key={post._id} className="border p-4 rounded-lg shadow">
            <h2 className="font-bold text-lg">{post.title}</h2>
            <p>Author: {post.author}</p>
            <p>Description: {post.description}</p>

            {/* Delete Button */}
            <button
              onClick={() => deletePost(post._id)}
              className="text-red-600 underline mt-2"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostPage;
