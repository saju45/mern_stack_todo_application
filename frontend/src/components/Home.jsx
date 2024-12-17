import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function Home() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");

  const navigate = useNavigate();

  const handleChanged = (event) => {
    setText(event.target.value);
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get("http://localhost:4001/todo/fetch", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
          credentials: true,
        });

        setTodos(response.data.todos);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const createTodo = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(
        "http://localhost:4001/todo/create",
        {
          text: text,
          completed: false,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
          credentials: true,
        }
      );
      setLoading(false);
      setTodos([...todos, response.data.newTodo]);
      setText("");
      console.log(response);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const todoStatus = async (todoId) => {
    const todo = todos.find((t) => t._id === todoId);

    try {
      setLoading(true);
      setError(null);
      const response = await axios.put(
        `http://localhost:4001/todo/update/${todoId}`,
        { ...todo, completed: !todo.completed },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
          credentials: true,
        }
      );
      setLoading(false);
      console.log(response);
      setTodos(
        todos.map((todo) =>
          todo._id === todoId ? { ...todo, completed: !todo.completed } : todo
        )
      );
      setText("");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createTodo();
    setText("");
  };

  const handleDelete = async (todoId) => {
    try {
      setLoading(true);
      setError(null);
      await axios.delete(`http://localhost:4001/todo/delete/${todoId}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: true,
      });
      setLoading(false);
      setTodos(todos.filter((todo) => todo._id !== todoId));
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const { data } = await axios.get("http://localhost:4001/user/logout", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: true,
      });
      toast.success(data.message || "logout successfully");
      localStorage.removeItem("jwt");
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  const remaingTodos = todos.filter((todo) => !todo.completed);
  console.log("remaining todos : ", remaingTodos);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-700 text-center mb-6">
          Todo App
        </h1>

        <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-6">
          <input
            className="w-full border rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-green-400 focus:outline-none"
            type="text"
            placeholder="Add a new todo..."
            value={text}
            onChange={handleChanged}
          />
          <button
            className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200 disabled:bg-gray-300"
            disabled={!text}
            type="submit"
          >
            Add
          </button>
        </form>

        {loading && <p className="text-blue-500 text-center">Loading...</p>}
        {error && <p className="text-red-500 text-center">Error: {error}</p>}
        {!loading && todos?.length === 0 && (
          <p className="text-gray-400 text-center">No todos found.</p>
        )}

        {!loading && todos?.length > 0 && (
          <ul className="space-y-4">
            {todos?.map((todo) => (
              <li
                key={todo._id}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-green-500 border-gray-300 rounded focus:ring-green-500"
                    checked={todo.completed}
                    onChange={() => todoStatus(todo._id)}
                  />
                  <span
                    className={`${
                      todo.completed ? "line-through text-gray-800 " : ""
                    }`}
                  >
                    {todo.text}
                  </span>
                </div>
                <button
                  className="text-red-500 hover:text-red-600 transition duration-150"
                  onClick={() => handleDelete(todo._id)}
                >
                  &#x2715;
                </button>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-4 text-center text-gray-500 text-lg">
          {remaingTodos?.length} Todo remaining{" "}
        </p>
        <button
          className=" text-center mt-2 text-white font-medium py-2 px-4 rounded-lg bg-blue-500 hover:bg-blue-600 transition duration-200 mx-auto block"
          onClick={() => handleLogout()}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;
