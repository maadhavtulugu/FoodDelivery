
import { useState, useContext } from "react";
import AdminMenuPanel from "./AdminMenuPanel";
import AdminOrdersPanel from "./AdminOrdersPanel";
import { AuthContext } from "../context/AuthContext"; 
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("menu");
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-yellow-500 text-white p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h1 className="text-xl sm:text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab("menu")}
            className={`px-4 py-2 rounded text-sm sm:text-base ${
              activeTab === "menu" ? "bg-white text-yellow-500" : "bg-yellow-600"
            }`}
          >
            Menu Management
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 rounded text-sm sm:text-base ${
              activeTab === "orders" ? "bg-white text-yellow-500" : "bg-yellow-600"
            }`}
          >
            Order Management
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-semibold text-sm sm:text-base"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="p-4 sm:p-6">
        {activeTab === "menu" && <AdminMenuPanel />}
        {activeTab === "orders" && <AdminOrdersPanel />}
      </main>
    </div>
  );
};

export default AdminDashboard;
