
import { useEffect, useState } from "react";
import api from "../services/api"; // your axios instance with JWT

const AdminOrdersPanel = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders"); // Admin-only endpoint
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Update order status
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await api.put(`/orders/${orderId}/status?status=${newStatus}`);
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: res.data.status } : o))
      );
    } catch (err) {
      console.error("Failed to update order status", err);
    }
  };

  if (loading) return <p className="text-center text-gray-500 mt-10">Loading orders...</p>;

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 inline-block">
        Order Management
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead className="bg-blue-100 text-gray-700 text-left">
            <tr>
              <th className="py-2 px-2 sm:py-3 sm:px-4">ID</th>
              <th className="py-2 px-2 sm:py-3 sm:px-4">Customer</th>
              <th className="py-2 px-2 sm:py-3 sm:px-4">Address</th>
              <th className="py-2 px-2 sm:py-3 sm:px-4">Mobile</th>
              <th className="py-2 px-2 sm:py-3 sm:px-4">Items</th>
              <th className="py-2 px-2 sm:py-3 sm:px-4">Total</th>
              <th className="py-2 px-2 sm:py-3 sm:px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50 transition">
                <td className="py-1 px-2 sm:py-2 sm:px-4 text-sm sm:text-base">{order.id}</td>
                <td className="py-1 px-2 sm:py-2 sm:px-4 text-sm sm:text-base">{order.customerName}</td>
                <td className="py-1 px-2 sm:py-2 sm:px-4 text-sm sm:text-base">{order.customerAddress}</td>
                <td className="py-1 px-2 sm:py-2 sm:px-4 text-sm sm:text-base">{order.mobileNumber}</td>
                <td className="py-1 px-2 sm:py-2 sm:px-4 text-sm sm:text-base">
                  <ul className="list-disc list-inside">
                    {order.items.map((item, i) => (
                      <li key={i}>
                        {item.itemName} × {item.quantity} (₹{item.price})
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="py-1 px-2 sm:py-2 sm:px-4 font-semibold text-sm sm:text-base">
                  ₹{order.totalPrice}
                </td>
                <td className="py-1 px-2 sm:py-2 sm:px-4">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="border rounded px-2 py-1 w-full sm:w-auto focus:ring focus:ring-blue-300"
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="PREPARING">PREPARING</option>
                    <option value="OUT_FOR_DELIVERY">OUT_FOR_DELIVERY</option>
                    <option value="DELIVERED">DELIVERED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminOrdersPanel;
