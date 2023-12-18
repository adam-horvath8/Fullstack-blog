import { Link, Outlet } from "react-router-dom";

export interface INavbarProps {}

export default function Navbar(props: INavbarProps) {
  return (
    <>
      <nav className="navbar">
        <Link to="createpost">Create a Post</Link>
        <Link to="home">Home Page</Link>
        <Link to="/">Login</Link>
        <Link to="registration">Registration</Link>
      </nav>
      <Outlet />
    </>
  );
}
