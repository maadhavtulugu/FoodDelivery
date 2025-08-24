
// import { useContext, useEffect, useState } from "react";
// import api from "../services/api";
// import { AuthContext } from "../context/AuthContext";
// import MenuItemDetails from "../components/MenuItemDetails";
// import OrderNowModal from "../components/OrderNowModal";

// function Menu() {
//   const restaurantId = 3;
//   const { user } = useContext(AuthContext);

//   const [menuItems, setMenuItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [category, setCategory] = useState(""); // filter
//   const [sortOrder, setSortOrder] = useState("");
//   const [searchQuery, setSearchQuery] = useState(""); // search input

//   const [showModal, setShowModal] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);

//   const [selectedMenuItem, setSelectedMenuItem] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Fetch menu from API
//   const fetchMenu = async () => {
//     setLoading(true);
//     try {
//       let url = `/menu/filter?restaurantId=${restaurantId}`;
//       if (category) url += `&category=${category}`;
//       if (sortOrder) url += `&sortOrder=${sortOrder}`;

//       const res = await api.get(url);
//       setMenuItems(res.data || []);
//     } catch (err) {
//       console.error("Failed to fetch menu:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMenu();
//   }, [category, sortOrder]);

//   // Add to cart
//   const handleAddToCart = async (itemId) => {
//     try {
//       const res = await api.post("/cart/add", { menuItemId: itemId, quantity: 1 });
//       alert("Added to cart successfully!");
//       console.log("Cart updated:", res.data);
//     } catch (err) {
//       console.error("Failed to add to cart:", err);
//       alert("Failed to add item to cart.");
//     }
//   };

//   // Open order modal
//   const handleOrderNowClick = (item) => {
//     setSelectedItem(item);
//     setShowModal(true);
//   };

//   // Open details modal
//   const handleOpenModal = (item) => {
//     setSelectedMenuItem(item);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setSelectedMenuItem(null);
//     setIsModalOpen(false);
//   };

//   // Filter menu items by search query
//   const filteredMenuItems = menuItems.filter(item =>
//     item.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   if (loading) {
//     return <p className="text-center mt-10">Loading menu...</p>;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-white px-6 py-10">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">Our Menu</h1>

//       {/* Search + Filters */}
//       <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
//         <input
//           type="text"
//           placeholder="Search menu items..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="px-4 py-2 rounded-lg shadow-sm border focus:ring-2 focus:ring-yellow-400 w-full sm:w-1/3"
//         />

//         <select
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className="px-4 py-2 rounded-lg shadow-sm border focus:ring-2 focus:ring-yellow-400"
//         >
//           <option value="">All Categories</option>
//           <option value="Burgers">Burger</option>
//           <option value="Pizzas">Pizza</option>
//           <option value="Drinks">Drinks</option>
//         </select>

//         <select
//           value={sortOrder}
//           onChange={(e) => setSortOrder(e.target.value)}
//           className="px-4 py-2 rounded-lg shadow-sm border focus:ring-2 focus:ring-yellow-400"
//         >
//           <option value="">Sort by Price</option>
//           <option value="asc">Low to High</option>
//           <option value="desc">High to Low</option>
//         </select>
//       </div>

//       {/* Menu items grid or empty message */}
//       {filteredMenuItems.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredMenuItems.map((item) => (
//             <div
//               key={item.id}
//               className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-4 flex flex-col"
//             >
//               {item.imageUrl ? (
//                 <img
//                   src={`http://localhost:8080${item.imageUrl}`}
//                   alt={item.name}
//                   className="w-full h-48 object-cover rounded-xl mb-3"
//                 />
//               ) : (
//                 <div className="w-full h-48 bg-gray-200 rounded-xl mb-3 flex items-center justify-center text-gray-500">
//                   No Image
//                 </div>
//               )}

//               <h2 className="text-lg font-semibold mb-1">{item.name}</h2>
//               <p className="text-gray-600 text-sm mb-2">{item.description}</p>
//               <p className="font-bold text-lg mb-4 text-yellow-600">₹{item.price}</p>

//               <div className="flex flex-col sm:flex-row gap-2 mt-auto">
//                 <button
//                   className="w-full py-2 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-500 transition"
//                   onClick={() => handleAddToCart(item.id)}
//                 >
//                   Add to Cart
//                 </button>
//                 <button
//                   className="w-full py-2 border border-yellow-400 text-yellow-600 rounded-lg hover:bg-yellow-100 font-semibold transition"
//                   onClick={() => handleOrderNowClick(item)}
//                 >
//                   Order Now
//                 </button>
//                 <button
//                   className="w-full py-2 border border-black text-black rounded-lg hover:bg-gray-100 font-semibold transition mt-2 sm:mt-0"
//                   onClick={() => handleOpenModal(item)}
//                 >
//                   View Details
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-gray-500 mt-10 text-lg">
//           No menu items found.
//         </p>
//       )}

//       {/* Modals */}
//       {showModal && (
//         <OrderNowModal
//           isOpen={showModal}
//           onClose={() => setShowModal(false)}
//           menuItem={selectedItem}
//         />
//       )}

//       {selectedMenuItem && (
//         <MenuItemDetails
//           isOpen={isModalOpen}
//           onClose={closeModal}
//           menuItem={selectedMenuItem}
//         />
//       )}
//     </div>
//   );
// }

// export default Menu;



import { useContext, useEffect, useState } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import MenuItemDetails from "../components/MenuItemDetails";
import OrderNowModal from "../components/OrderNowModal";

function Menu() {
  const restaurantId = 3;
  const { user } = useContext(AuthContext);

  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState(""); // filter
  const [sortOrder, setSortOrder] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // search input

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch menu from API
  const fetchMenu = async () => {
    setLoading(true);
    try {
      let url = `/menu/filter?restaurantId=${restaurantId}`;
      if (category) url += `&category=${category}`;
      if (sortOrder) url += `&sortOrder=${sortOrder}`;

      const res = await api.get(url);
      setMenuItems(res.data || []);
    } catch (err) {
      console.error("Failed to fetch menu:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, [category, sortOrder]);

  // Add to cart
  const handleAddToCart = async (itemId) => {
    try {
      const res = await api.post("/cart/add", { menuItemId: itemId, quantity: 1 });
      alert("Added to cart successfully!");
      console.log("Cart updated:", res.data);
    } catch (err) {
      console.error("Failed to add to cart:", err);
      alert("Failed to add item to cart.");
    }
  };

  // Open order modal
  const handleOrderNowClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  // Open details modal
  const handleOpenModal = (item) => {
    setSelectedMenuItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMenuItem(null);
    setIsModalOpen(false);
  };

  // Filter menu items by search query
  const filteredMenuItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <p className="text-center mt-10">Loading menu...</p>;
  }

  return (
    <div className=" min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-white px-4 sm:px-6 lg:px-10 py-10">
      <h1 className="font-poppins text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center sm:text-left">Our Menu</h1>

      {/* Search + Filters */}
      <div className="font-poppins flex flex-col sm:flex-row justify-center sm:justify-start gap-4 mb-8 flex-wrap">
        <input
          type="text"
          placeholder="Search menu items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 rounded-lg shadow-sm border focus:ring-2 focus:ring-yellow-400 w-full sm:w-1/3"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 rounded-lg shadow-sm border focus:ring-2 focus:ring-yellow-400 w-full sm:w-auto"
        >
          <option value="">All Categories</option>
          <option value="Burgers">Burgers</option>
          <option value="Pizzas">Pizzas</option>
          <option value="Starters">Starters</option>
          <option value="Main Course – Veg">Main Course–Veg</option>
          <option value="Main Course – Non-Veg">Main Course– Non-Veg</option>
          <option value="Beverages">Beverages</option>
          <option value="Desserts">Desserts</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-4 py-2 rounded-lg shadow-sm border focus:ring-2 focus:ring-yellow-400 w-full sm:w-auto"
        >
          <option value="">Sort by Price</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      {/* Menu items grid */}
      {filteredMenuItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMenuItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-4 flex flex-col h-full"
            >
              {item.imageUrl ? (
                <img
                  src={`http://localhost:8080${item.imageUrl}`}
                  alt={item.name}
                  className="w-full h-48 sm:h-52 lg:h-56 object-cover rounded-xl mb-3"
                />
              ) : (
                <div className="w-full h-48 sm:h-52 lg:h-56 bg-gray-200 rounded-xl mb-3 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}

              <h2 className="font-poppins text-lg sm:text-base lg:text-lg font-semibold mb-1">{item.name}</h2>
              <p className="text-gray-600 text-sm mb-2">{item.description}</p>
              <p className="font-bold text-lg mb-4 text-yellow-600">₹{item.price}</p>

              <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                <button
                  className="w-full py-2 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-500 transition"
                  onClick={() => handleAddToCart(item.id)}
                >
                  Add to Cart
                </button>
                <button
                  className="w-full py-2 border border-yellow-400 text-yellow-600 rounded-lg hover:bg-yellow-100 font-semibold transition"
                  onClick={() => handleOrderNowClick(item)}
                >
                  Order Now
                </button>
                <button
                  className="w-full py-2 border border-black text-black rounded-lg hover:bg-gray-100 font-semibold transition mt-2 sm:mt-0"
                  onClick={() => handleOpenModal(item)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10 text-lg">
          No menu items found.
        </p>
      )}

      {/* Modals */}
      {showModal && (
        <OrderNowModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          menuItem={selectedItem}
        />
      )}

      {selectedMenuItem && (
        <MenuItemDetails
          isOpen={isModalOpen}
          onClose={closeModal}
          menuItem={selectedMenuItem}
        />
      )}
    </div>
  );
}

export default Menu;

