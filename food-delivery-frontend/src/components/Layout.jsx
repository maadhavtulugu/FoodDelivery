
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// function Layout() {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const logoutDem = () => {
//     logout();
//     navigate("/login"); 
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-br from-yellow-100 via-orange-100 to-white">
//       {/* Header */}
//       <header className="bg-gradient-to-r from-black to-[#8B5E3C] text-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
//         <Link to="/" className="text-2xl font-extrabold text-black tracking-tight">
//           <span className="bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
//             FoodDelivery
//           </span>
//         </Link>

//         <nav className="space-x-4 text-sm sm:text-base font-medium">
//           <Link to="/menu" className="px-4 py-1.5 rounded-full border border-yellow-400 text-yellow-500 hover:bg-yellow-400 hover:text-black transition shadow-sm">
//             Menu
//           </Link>

//           {user ? (
//             <>
//               <Link to="/orders" className="px-4 py-1.5 rounded-full border border-yellow-400 text-yellow-500 hover:bg-yellow-400 hover:text-black transition shadow-sm">
//                 Orders
//               </Link>
//               <Link to="/cart" className="px-4 py-1.5 rounded-full border border-yellow-400 text-yellow-500 hover:bg-yellow-400 hover:text-black transition shadow-sm">
//                 Cart
//               </Link>
//               <Link to="/profile" className="px-4 py-1.5 rounded-full border border-yellow-400 text-yellow-500 hover:bg-yellow-400 hover:text-black transition shadow-sm">
//                 Profile
//               </Link>
//               <button onClick={logoutDem} className="px-4 py-1.5 rounded-full border border-yellow-400 text-yellow-500 hover:bg-yellow-400 hover:text-black transition shadow-sm">
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link to="/login" className="px-4 py-1.5 rounded-full border border-yellow-400 text-yellow-500 hover:bg-yellow-400 hover:text-black transition shadow-sm">
//                 Login
//               </Link>
//               <Link to="/signup" className="px-4 py-1.5 rounded-full border border-yellow-400 text-yellow-500 hover:bg-yellow-400 hover:text-black transition shadow-sm">
//                 Sign Up
//               </Link>
//             </>
//           )}
//         </nav>
//       </header>

//       {/* Page content */}
//       <main className="flex-grow">
//         <Outlet />
//       </main>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-white text-center text-sm py-4">
//         © {new Date().getFullYear()} FoodDelivery. All rights reserved.
//       </footer>
//     </div>
//   );
// }

// export default Layout;


// import { Link, Outlet, useNavigate } from "react-router-dom";
// import { useContext, useState } from "react";
// import { AuthContext } from "../context/AuthContext";

// function Layout() {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [menuOpen, setMenuOpen] = useState(false);

//   const logoutDem = () => {
//     logout();
//     navigate("/login"); 
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-br from-yellow-100 via-orange-100 to-white">
//       {/* Header */}
//       <header className="bg-gradient-to-r from-black to-[#8B5E3C] text-white shadow-md px-4 sm:px-6 py-4 flex justify-between items-center sticky top-0 z-50">
//         <Link to="/" className="text-xl sm:text-2xl font-extrabold text-black tracking-tight">
//           <span className="bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
//             FoodDelivery
//           </span>
//         </Link>

//         {/* Hamburger for mobile */}
//         <button
//           className="sm:hidden text-white focus:outline-none"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             {menuOpen ? (
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             ) : (
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             )}
//           </svg>
//         </button>

//         {/* Navigation */}
//         <nav className={`flex-col sm:flex-row sm:flex space-y-2 sm:space-y-0 sm:space-x-4 text-sm sm:text-base font-medium absolute sm:static top-full left-0 w-full sm:w-auto bg-black sm:bg-transparent transition-all ${menuOpen ? 'flex' : 'hidden'} sm:flex px-4 py-2 sm:p-0`}>
//           <Link to="/menu" className="px-4 py-1.5 rounded-full border border-yellow-400 text-yellow-500 hover:bg-yellow-400 hover:text-black transition shadow-sm text-center">
//             Menu
//           </Link>

//           {user ? (
//             <>
//               <Link to="/orders" className="px-4 py-1.5 rounded-full border border-yellow-400 text-yellow-500 hover:bg-yellow-400 hover:text-black transition shadow-sm text-center">
//                 Orders
//               </Link>
//               <Link to="/cart" className="px-4 py-1.5 rounded-full border border-yellow-400 text-yellow-500 hover:bg-yellow-400 hover:text-black transition shadow-sm text-center">
//                 Cart
//               </Link>
//               <Link to="/profile" className="px-4 py-1.5 rounded-full border border-yellow-400 text-yellow-500 hover:bg-yellow-400 hover:text-black transition shadow-sm text-center">
//                 Profile
//               </Link>
//               <button onClick={logoutDem} className="px-4 py-1.5 rounded-full border border-yellow-400 text-yellow-500 hover:bg-yellow-400 hover:text-black transition shadow-sm w-full sm:w-auto text-center">
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link to="/login" className="px-4 py-1.5 rounded-full border border-yellow-400 text-yellow-500 hover:bg-yellow-400 hover:text-black transition shadow-sm w-full sm:w-auto text-center">
//                 Login
//               </Link>
//               <Link to="/signup" className="px-4 py-1.5 rounded-full border border-yellow-400 text-yellow-500 hover:bg-yellow-400 hover:text-black transition shadow-sm w-full sm:w-auto text-center">
//                 Sign Up
//               </Link>
//             </>
//           )}
//         </nav>
//       </header>

//       {/* Page content */}
//       <main className="flex-grow px-4 sm:px-6 py-6">
//         <Outlet />
//       </main>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-white text-center text-sm py-4">
//         © {new Date().getFullYear()} FoodDelivery. All rights reserved.
//       </footer>
//     </div>
//   );
// }

// export default Layout;


import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Layout() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutDem = () => {
    logout();
    navigate("/login"); 
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-yellow-100 via-orange-100 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-black to-[#8B5E3C] text-white shadow-md px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center sticky top-0 z-50">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-black tracking-tight mb-2 sm:mb-0">
          <span className="bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
            FoodDelivery
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex flex-wrap gap-2 sm:gap-4 justify-center sm:justify-end text-sm sm:text-base font-medium">
          <Link to="/menu" className="px-4 py-1.5 rounded-full border border-yellow-400 text-yellow-500 hover:bg-yellow-400 hover:text-black transition shadow-sm text-center">
            Menu
          </Link>

          {user ? (
            <>
              <Link to="/orders" className="px-4 py-1.5 rounded-full border border-yellow-400 text-yellow-500 hover:bg-yellow-400 hover:text-black transition shadow-sm text-center">
                Orders
              </Link>
              <Link to="/cart" className="px-4 py-1.5 rounded-full border border-yellow-400 text-yellow-500 hover:bg-yellow-400 hover:text-black transition shadow-sm text-center">
                Cart
              </Link>
              <Link to="/profile" className="px-4 py-1.5 rounded-full border border-yellow-400 text-yellow-500 hover:bg-yellow-400 hover:text-black transition shadow-sm text-center">
                Profile
              </Link>
              <button onClick={logoutDem} className="px-4 py-1.5 rounded-full border border-yellow-400 text-yellow-500 hover:bg-yellow-400 hover:text-black transition shadow-sm text-center">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-4 py-1.5 rounded-full border border-yellow-400 text-yellow-500 hover:bg-yellow-400 hover:text-black transition shadow-sm text-center">
                Login
              </Link>
              <Link to="/signup" className="px-4 py-1.5 rounded-full border border-yellow-400 text-yellow-500 hover:bg-yellow-400 hover:text-black transition shadow-sm text-center">
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </header>

      {/* Page content */}
      <main className="flex-grow px-4 sm:px-6 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center text-sm py-4">
        © {new Date().getFullYear()} FoodDelivery. All rights reserved.
      </footer>
    </div>
  );
}

export default Layout;
