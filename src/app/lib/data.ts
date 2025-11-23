export interface User {
  id: number;
  name: string;
  userName: string;
  email: string;
}

export async function getUser(id: string): Promise<User> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  return res.json();
}

export const getUserPosts = async(userId: number) =>{
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    if(!res.ok){
        throw new Error('Failed to fetch posts for users');
    }
    return res.json();
}
