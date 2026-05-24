import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Register() {
  const [studentName, setStudentName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://course-backend-a0oh.onrender.com/api/auth/register",
        {
          studentName,
          password,
        }
      );

      alert(res.data.message);
    } catch (err) {
      alert("Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="border p-6 rounded shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4">
          Register
        </h2>

        <input
          type="text"
          placeholder="Student Name"
          value={studentName}
          onChange={(e) =>
            setStudentName(e.target.value)
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
          Register
        </button>

        <p className="mt-3">
          Already registered?{" "}
          <Link
            to="/login"
            className="text-blue-500"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
