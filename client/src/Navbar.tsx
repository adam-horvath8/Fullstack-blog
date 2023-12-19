import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "./helpers/AuthContext";

export interface INavbarProps {}

export default function Navbar(props: INavbarProps) {
  const { authState } = useContext(AuthContext);

  return (
    <>
      <nav className="navbar">
        <Link to="createpost">Create a Post</Link>
        <Link to="home">Home Page</Link>
        {!authState && (
          <>
            <Link to="/">Login</Link>
            <Link to="registration">Registration</Link>
          </>
        )}
      </nav>
      <Outlet />
    </>
  );
}
