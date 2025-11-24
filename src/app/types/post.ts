export interface Post{
    id:number;
    userId:number;
    title:string;
    body:string;
}
export interface PostDB{
    _id:number;
    title:string;
    author:string;
    description:string;
    createdAt:Date;
    updatedAt:Date;
    __v:number;
}