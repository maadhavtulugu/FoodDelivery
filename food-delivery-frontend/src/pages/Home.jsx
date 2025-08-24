
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="relative h-[calc(100vh-80px)] w-full">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-[url('/rest4.jpg')] bg-cover bg-center"
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4 text-white">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
          <span className="text-yellow-400">Delicious</span> Food, <br /> 
          Delivered <span className="text-yellow-400">Fast</span>
        </h2>

        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
          Order from your favorite restaurants with just a few clicks.
        </p>

        <Link
          to="/menu"
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-8 sm:py-4 sm:px-10 rounded-full shadow-lg transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          View Menu
        </Link>
      </div>
    </div>
  );
}

export default Home;
