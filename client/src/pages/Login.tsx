import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export interface ILoginProps {}

export default function Login(props: ILoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = { username: username, password: password };
      await axios
        .post("http://localhost:3001/auth/login", data)
        .then((response) => console.log(response.data));
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <input type="text" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
