import React from 'react'
import { getUsers,getPosts } from '../lib/data'

const ParallelDataFetchingPage = async () => {
  const [users, posts] = await Promise.all([
    getUsers(),
    getPosts(),
  ])
  console.log(posts)

  return (
    <div>
      <h1>Paralel Data Fetching</h1>
      <p>Total users: {users.length}</p>
      <p>Total posts: {posts.length}</p>

    </div>
  )
}

export default ParallelDataFetchingPage
