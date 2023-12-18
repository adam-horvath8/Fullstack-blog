import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./Navbar";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";

export interface IAppProps {}

export default function App(props: IAppProps) {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Navbar />}>
        <Route index element={<Login />} />
        <Route path="registration" element={<Registration />} />
        <Route path="home" element={<Home />} />
        <Route path="createpost" element={<CreatePost />} />
        <Route path="post/:id" element={<Post />} />
      </Route>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
