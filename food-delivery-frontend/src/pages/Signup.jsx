
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Signup() {
  // const { signup } = useContext(AuthContext);
  const { signup, } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const success = await signup(name, email, password);
    if (success) {
      navigate("/menu");
    } else {
      setError("Signup failed. Try again.");
    }
    setLoading(false);
  };

  // const handleGoogleSignup = () => {
  //   window.location.href = "http://localhost:8080/oauth2/authorization/google";
  // };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('/rest4.jpg')] bg-cover bg-center">
      <div className="w-full max-w-sm p-8 rounded-2xl shadow-2xl backdrop-blur-md bg-black/50 border border-black/20 text-white">
        
        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-6 drop-shadow-lg">
          <span className="text-yellow-400">Create Account</span>
        </h1>

        {/* Signup Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 mt-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg transition hover:scale-105"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-sm text-gray-200">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* <button
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center py-2 bg-white text-black rounded-lg shadow-md hover:bg-gray-100 transition hover:scale-105"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Continue with Google
        </button> */}

        {/* Login Link */}
        <p className="mt-4 text-sm text-center text-gray-200">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-yellow-400 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
