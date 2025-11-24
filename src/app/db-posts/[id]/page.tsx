import { connectDB } from '@/app/lib/mongodb';
import Post from '@/app/models/Post';
import React from 'react'

const PostDetailspage = async({params}: {params: Promise<{id: string}>}) => {
    const {id} = await params;
    await connectDB();
    const data = await Post.findById(id).lean();
    const post = JSON.parse(JSON.stringify(data));
  return (
    <div className='p-6 '>
     <h1>Post Details</h1>
     <p>Post Title:{post.title}</p>
     <p>Post Author:{post.author}</p>
     <p>Post Description:{post.description}</p>
     <p>Post Created At:{post.description}</p>
    </div>
  )
}

export default PostDetailspage
