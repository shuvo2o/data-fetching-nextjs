import { Post } from '@/types/post';
import React from 'react'

const ServerPosts = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts")
    const posts = await res.json();
    console.log(posts);
    return (
        <div>
            <h1>Posts from Server side rendering</h1>
            <ul>
                {posts.map((post: Post) => (
                    <li key={post.id} className="p-4 bg-gray-100 mb-4 rounded shadow text-black">
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ServerPosts
