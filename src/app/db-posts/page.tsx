import React from 'react'
import { connectDB } from '../lib/mongodb'
import Post from '../models/Post';





const PostPage = async () => {
    await connectDB();

    const posts = await Post.find().lean();
    console.log(posts);

    return (
        <div className='p-6'>
            <h1 className='text-2xl font-bold mb-4'>All Posts</h1>
            <ul className='space-y-4'>
                {posts.map((post) => (
                    <li key={post._id as string} className='
                    border p-4 rounded-lg shadow'>
                        <h2>{post.title}</h2>
                        <p>Author: {post.author}</p>
                        <p>description: {post.description}</p>
                    </li>
                ))
                }
            </ul>
        </div>
    )
}

export default PostPage;
