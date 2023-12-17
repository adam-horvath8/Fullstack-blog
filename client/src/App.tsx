import axios from "axios";
import { useEffect, useState } from "react";

type PostType = {
  title: string;
  postText: string;
  username: string;
};

type AllPostsType = PostType[];

export interface IAppProps {}

export default function App(props: IAppProps) {
  const [posts, setPosts] = useState<AllPostsType>([]);

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
    <div className="App">
      {posts.map((post, index) => (
        <div className="post">
          <div className="title">{post.title}</div>
          <div className="body">{post.postText}</div>
          <div className="footer">{post.username}</div>
        </div>
      ))}
    </div>
  );
}
