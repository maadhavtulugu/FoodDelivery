
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ProfilePage() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-600">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-white p-6">
        <div className="bg-white shadow-md rounded-2xl p-8 text-center max-w-md w-full">
          <h2 className="text-2xl font-semibold text-yellow-800 mb-4">Not Logged In</h2>
          <p className="text-gray-600">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-start min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-white p-6">
      <div className="bg-white rounded-2xl shadow-md p-6 max-w-lg w-full space-y-6">
        
        {/* Profile Header */}
        <div className="flex flex-col items-center">
          <div className="w-28 h-28 rounded-full bg-yellow-400 flex items-center justify-center text-black text-4xl font-extrabold shadow-md">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <h1 className="text-3xl font-bold text-yellow-800 mt-4">{user?.name || "Guest User"}</h1>
          <p className="text-gray-600">{user?.email || "guest@example.com"}</p>
        </div>

        {/* Profile Details */}
        <div className="space-y-4">
          <div className="flex justify-between bg-gray-50 p-4 rounded-xl shadow-sm">
            <span className="text-gray-600 font-medium">User ID</span>
            <span className="text-yellow-800 font-semibold">{user?.id || "N/A"}</span>
          </div>
          <div className="flex justify-between bg-gray-50 p-4 rounded-xl shadow-sm">
            <span className="text-gray-600 font-medium">Name</span>
            <span className="text-yellow-800">{user?.name || "Guest"}</span>
          </div>
          <div className="flex justify-between bg-gray-50 p-4 rounded-xl shadow-sm">
            <span className="text-gray-600 font-medium">Email</span>
            <span className="text-yellow-800">{user?.email || "guest@example.com"}</span>
          </div>
        </div>

        {/* Profile Actions */}
        <div className="flex justify-center gap-4 mt-4">
          <button className="px-5 py-2 bg-yellow-400 text-black font-semibold rounded-xl shadow-md hover:bg-yellow-500 transition">
            Edit Profile
          </button>
          <button className="px-5 py-2 bg-gray-200 text-gray-800 font-semibold rounded-xl shadow-md hover:bg-gray-300 transition">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

