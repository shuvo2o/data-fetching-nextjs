import { connectDB } from '@/app/lib/mongodb';
import Post from '@/app/models/Post';
import React from 'react';
import EditForm from './EditForm';

interface EditPostProps { params: { id: string; } }

const EditPost = async ({ params }: EditPostProps) => {
  const { id } = await params;
  await connectDB();
  const data = await Post.findById(id).lean();
  const post = JSON.parse(JSON.stringify(data));
  if (!post) {
    return <div className='p-6'>Post Not Found</div>
  }
  return (
    <div> <h1 className='mb-4'>Edit Post</h1>
      <EditForm post={post} />
    </div>)
}
export default EditPost