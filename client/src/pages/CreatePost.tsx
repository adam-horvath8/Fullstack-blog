import { Formik, Form, Field, ErrorMessage } from "formik";
import { PostType } from "./Home";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export interface ICreatePostProps {}

export default function CreatePost(props: ICreatePostProps) {

  const navigate = useNavigate()

  const initialValues = {
    title: "",
    postText: "",
    username: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    postText: Yup.string().required(),
    username: Yup.string().min(3).max(15).required(),
  });

  const handleSubmit = (data: PostType) => {
    const createPost = async () => {
      try {
        await axios.post("http://localhost:3001/posts", data);
        navigate("/")
      } catch (err) {
        console.log(err);
      }
    };

    createPost();
  };

  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Title:</label>
          <ErrorMessage name="title" component="span" />
          <Field
            id="inputCreatePost"
            name="title"
            placeholder="(Ex. Title...)"
          />
          <label>Post:</label>
          <ErrorMessage name="postText" component="span" />
          <Field
            id="inputCreatePost"
            name="postText"
            placeholder="(Ex. Post...)"
          />
          <label>Username:</label>
          <ErrorMessage name="username" component="span" />
          <Field
            id="inputCreatePost"
            name="username"
            placeholder="(Ex. Peter...)"
          />
          <button type="submit">Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}
