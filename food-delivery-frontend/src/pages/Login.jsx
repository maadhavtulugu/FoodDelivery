
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const success = await login(email, password);
    if (success) {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const role = decoded.role;

      if (role === "ADMIN") navigate("/admin");
      else navigate("/menu");
    } else {
      setError("Invalid credentials. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('/rest4.jpg')] bg-cover bg-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl shadow-2xl backdrop-blur-md bg-black/50 border border-black/20 text-white">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 drop-shadow-lg">
          <span className="text-yellow-400">FoodDelivery</span>
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 mt-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg transition hover:scale-105"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-sm sm:text-base text-gray-200">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <p className="mt-4 text-sm sm:text-base text-center text-gray-200">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-yellow-400 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;











