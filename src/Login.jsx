import { useState } from "react";
import axios from "axios";

function Login() {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          studentId,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      alert("Login Successful");
      console.log(res.data);
    } catch (err) {
      alert("Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleLogin}
        className="border p-6 rounded shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4">
          Login
        </h2>

        <input
          type="number"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) =>
            setStudentId(e.target.value)
          }
          className="border p-2 w-full mb-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="border p-2 w-full mb-3"
        />

        <button
          type="submit"
          className="border w-full p-2 hover:bg-gray-100"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;