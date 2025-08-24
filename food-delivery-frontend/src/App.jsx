import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Menu from "./pages/Menu.jsx";
import AdminDashboard from "./admin/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Home from "./pages/Home.jsx";
import Layout from "./components/Layout.jsx"; 
import Profile from "./pages/Profile.jsx"
import Cart from "./pages/Cart.jsx"
import OAuth2RedirectHandler from "./pages/OAuth2RedirectHandler.jsx";


import "./index.css";
import Orders from "./pages/Orders.jsx";
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
      
       <Route
        path="/admin"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
