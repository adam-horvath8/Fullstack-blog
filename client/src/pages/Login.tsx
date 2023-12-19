import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

export interface ILoginProps {}

export default function Login(props: ILoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setAuthState } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = { username: username, password: password };
      await axios
        .post("http://localhost:3001/auth/login", data)
        .then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            localStorage.setItem("accessToken", response.data);
            setAuthState(true);
            navigate("/home");
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="loginContainer">
      <label id="username">Username</label>
      <input
        type="text"
        id="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <label id="password">Password</label>

      <input
        type="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
