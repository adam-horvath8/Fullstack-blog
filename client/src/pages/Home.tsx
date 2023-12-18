import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export type PostType = {
  id?: number;
  title: string;
  postText: string;
  username: string;
};

export type AllPostsType = PostType[];

export interface IHomeProps {}

export default function Home(props: IHomeProps) {
  const [posts, setPosts] = useState<AllPostsType>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/posts");
        setPosts(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getPosts();
  }, []);

  return (
    <div>
      {posts.map((post, index) => (
        <div
          key={post.id}
          className="post"
          onClick={() => navigate(`/post/${post.id}`)}
        >
          <div className="title">{post.title}</div>
          <div className="body">{post.postText}</div>
          <div className="footer">{post.username}</div>
        </div>
      ))}
    </div>
  );
}
