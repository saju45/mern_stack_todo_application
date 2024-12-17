import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
function Login() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleChanged = (event) => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:4001/user/login",
        {
          email: userInfo.email,
          password: userInfo.password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("jwt", data.token);

      toast.success("User login successfully!");
      setUserInfo({
        email: "",
        password: "",
      });
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
        <h1 className="text-3xl font-bold text-gray-700 text-center mb-6">
          Login
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-700 font-medium mb-1">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="border rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter your email"
              value={userInfo.email}
              onChange={handleChanged}
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-gray-700 font-medium mb-1"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="border rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter your password"
              value={userInfo.password}
              onChange={handleChanged}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
          <p className="text-center text-gray-700 font-medium">
            New User?{" "}
            <Link
              to="/signup"
              className="text-blue-400 font-bold cursor-pointer hover:underline"
            >
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
