import { getUser,getUserPosts } from '@/app/lib/data';
import React from 'react'
interface UserDetailsProps{
    params:{
        id:string
    }
}
const UserDetailspage = async({params}: UserDetailsProps)=> {
    const {id} = await params;
    const user = await getUser(id);
    // console.log(user);

    const post = await getUserPosts(user.id);
    console.log(post);
  return (
    <div>
      <h1>User Details: {user.name}</h1>
      <p>Email: {user.email}</p>

      <h1>Post by {user.name}</h1>
      <ul>
        {
            post.map((post) =>(
                <li key={post.id} className='border p-4 my-2 rounded-2xl'>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </li>
            ))
        }
      </ul>
    </div>
  )
}

export default UserDetailspage
