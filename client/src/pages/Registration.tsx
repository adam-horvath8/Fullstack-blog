import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type UserType = {
  username: string;
  password: string;
};

export interface IRegistrationProps {}

export default function Registration(props: IRegistrationProps) {
  const navigate = useNavigate();

  const initialValues = {
    password: "",
    username: "",
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().min(4).max(20).required(),
    username: Yup.string().min(3).max(15).required(),
  });

  const handleSubmit = (data: UserType) => {
    const createUser = async () => {
      try {
        await axios.post("http://localhost:3001/auth", data);
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    };

    createUser();
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Username:</label>
          <ErrorMessage name="username" component="span" />
          <Field
            id="inputCreatePost"
            name="username"
            placeholder="Your Username..."
          />
          <label>Password:</label>
          <ErrorMessage name="password" component="span" />
          <Field
            id="inputCreatePost"
            name="password"
            placeholder="Your Password..."
            type="password"
          />
          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
}
