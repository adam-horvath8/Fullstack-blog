import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostType } from "./Home";

type CommentType = {
  commentBody: string;
  id?: number;
};

export interface IPostProps {}

export default function Post(props: IPostProps) {
  const [postObject, setPostObject] = useState<PostType>({});
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState("");

  let { id } = useParams();

  const getPost = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/posts/byId/${id}`
      );
      setPostObject(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getComments = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/comments/${id}`);
      setComments(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPost();
    getComments();
  }, []);

  const addComment = async () => {
    try {
      await axios.post("http://localhost:3001/comments", {
        commentBody: newComment,
        PostId: id,
      });
      const commentToAdd = { commentBody: newComment };
      setComments([...comments, commentToAdd]);
      setNewComment("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title"> {postObject.title}</div>
          <div className="body"> {postObject.postText}</div>
          <div className="footer"> {postObject.username}</div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Comment..."
            autoComplete="off"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={addComment}>Add Comment</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment) => (
            <div key={comment.id} className="comment">
              {comment.commentBody}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
