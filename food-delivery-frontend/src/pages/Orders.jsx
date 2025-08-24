
import { useEffect, useState } from "react";
import api from "../services/api";
import OrderTrackingModal from "../components/OrderTrackingModal";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState(null); // For tracking modal

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders/me");
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const cancelOrder = async (orderId) => {
    try {
      await api.put(`/orders/${orderId}/cancel`);
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, status: "CANCELLED" } : o
        )
      );
    } catch (err) {
      if (err.response && err.response.data) {
        alert(err.response.data.message || "Failed to cancel order");
      } else {
        alert("Something went wrong while cancelling order");
      }
      console.error("Error cancelling order", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-yellow-600 text-lg font-semibold">Loading your orders...</div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="font-poppins flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-white p-6">
        <div className="bg-white rounded-2xl shadow-md border border-yellow-200 p-6 text-center max-w-md w-full">
          <p className="text-2xl font-semibold mb-2">📦 No Orders Yet!</p>
          <p className="text-gray-600">Your order history will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-white px-4 sm:px-6 lg:px-10 py-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="font-poppins text-2xl sm:text-3xl font-bold text-yellow-800 mb-6 text-center">
          My Orders
        </h1>

        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-2xl shadow-md border border-yellow-200 p-4 sm:p-6 space-y-4"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
              <h2 className="text-lg sm:text-xl font-semibold text-yellow-800">
                Order #{order.id}
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === "DELIVERED"
                    ? "bg-green-100 text-green-700"
                    : order.status === "CANCELLED"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* Customer Info */}
            <div className="text-gray-600 space-y-1 text-sm sm:text-base">
              <p>
                <span className="font-semibold text-yellow-800">Customer:</span>{" "}
                {order.customerName}
              </p>
              <p>
                <span className="font-semibold text-yellow-800">Address:</span>{" "}
                {order.customerAddress}
              </p>
              <p>
                <span className="font-semibold text-yellow-800">Mobile:</span>{" "}
                {order.mobileNumber}
              </p>
            </div>

            {/* Items */}
            <div>
              <h3 className="font-semibold text-yellow-800 mb-2">Items:</h3>
              <ul className="space-y-2 text-sm sm:text-base">
                {order.items?.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between bg-orange-100 p-3 rounded-lg"
                  >
                    <span>
                      {item.itemName} × {item.quantity}
                    </span>
                    <span>₹{item.price}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Total + Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
              <div className="text-yellow-800 font-bold text-lg">
                Total: ₹{order.totalPrice}
              </div>

              <div className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-0">
                {order.status === "PENDING" && (
                  <button
                    onClick={() => cancelOrder(order.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
                  >
                    Cancel Order
                  </button>
                )}
                <button
                  onClick={() => setSelectedOrderId(order.id)}
                  className="px-4 py-2 bg-yellow-400 text-black rounded-xl hover:bg-yellow-500 transition"
                >
                  Track Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedOrderId && (
        <OrderTrackingModal
          orderId={selectedOrderId}
          onClose={() => setSelectedOrderId(null)}
        />
      )}
    </div>
  );
}

