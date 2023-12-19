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
import { AuthContext } from "./helpers/AuthContext";
import { useEffect, useState } from "react";

export interface IAppProps {}

export default function App(props: IAppProps) {
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setAuthState(true);
    }
  }, []);

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
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    </div>
  );
}
