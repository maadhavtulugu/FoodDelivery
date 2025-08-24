

import React, { useEffect, useState } from "react";
import api from "../services/api"; 

const AdminMenuPanel = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
    category: "",
    image: null
  });
  const [isEditing, setIsEditing] = useState(false);
  const [filterCategory, setFilterCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const restaurantId = 3; 

  const fetchMenuItems = async (category = null, sort = null) => {
    try {
      let url = `/menu/filter?restaurantId=${restaurantId}`;
      if (category) url += `&category=${category}`;
      if (sort) url += `&sortOrder=${sort}`;

      const res = await api.get(url);
      setMenuItems(res.data);
    } catch (err) {
      console.error("Failed to fetch menu items:", err);
    }
  };

  useEffect(() => {
    fetchMenuItems(filterCategory, sortOrder);
  }, [filterCategory, sortOrder]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let menuItemRes;
      if (isEditing) {
        menuItemRes = await api.put(`/menu/${formData.id}`, {
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          category: formData.category,
        });
      } else {
        menuItemRes = await api.post(`/menu?restaurantId=${restaurantId}`, {
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          category: formData.category,
        });
      }

      if (formData.image) {
        const formDataImage = new FormData();
        formDataImage.append("file", formData.image);
        await api.post(`/menu/${menuItemRes.data.id}/image`, formDataImage, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      fetchMenuItems(filterCategory, sortOrder);
      setFormData({ id: null, name: "", description: "", price: "", category: "", image: null });
      setIsEditing(false);

    } catch (err) {
      console.error("Error saving menu item:", err);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      image: null
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await api.delete(`/menu/${id}`);
      fetchMenuItems(filterCategory, sortOrder);
      alert("Menu item deleted successfully!");
    } catch (err) {
      const message = err.response?.data || "Failed to delete menu item.";
      alert(message);
      console.error("Failed to delete item:", err);
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4">Manage Menu</h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border p-2 rounded w-full sm:w-auto"
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
          className="border p-2 rounded w-full sm:w-auto"
        >
          <option value="">Sort by price</option>
          <option value="asc">Low → High</option>
          <option value="desc">High → Low</option>
        </select>
      </div>

      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 sm:p-6 rounded-2xl shadow-md">
        <h3 className="font-bold mb-2">{isEditing ? "Edit Menu Item" : "Add New Menu Item"}</h3>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="mb-2 border"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {isEditing ? "Update" : "Add"}
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-transform duration-300"
          >
            <img
              src={`http://localhost:8080${item.imageUrl}`}
              alt={item.name}
              className="h-40 w-full object-cover rounded-t-2xl"
            />
            <h3 className="mt-2 font-bold text-lg">{item.name}</h3>
            <p className="text-gray-600 text-sm">{item.description}</p>
            <p className="mt-1 font-semibold text-gray-800">₹{item.price}</p>
            <p className="text-sm text-gray-500">{item.category}</p>

            <div className="flex flex-col sm:flex-row gap-2 mt-2">
              <button
                onClick={() => handleEdit(item)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 w-full sm:w-auto"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 w-full sm:w-auto"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMenuPanel;
