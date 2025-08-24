
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

export default function OrderNowModal({ isOpen, onClose, menuItem }) {
  const { user } = useContext(AuthContext);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");

  // Reset fields when modal opens
  useEffect(() => {
    if (isOpen) {
      setPhoneNumber("");
      setDeliveryAddress("");
    }
  }, [isOpen]);

  if (!isOpen || !menuItem) return null;

  const handleSubmitOrder = async () => {
    if (!phoneNumber || !deliveryAddress) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const orderRequest = {
        restaurantId: menuItem.restaurantId,
        customerName: user.name,
        customerAddress: deliveryAddress,
        mobileNumber: phoneNumber,
        items: [{ menuItemId: menuItem.id, quantity: 1 }],
      };

      const res = await api.post("/orders/direct", orderRequest);
      alert("Order placed successfully!");
      console.log("Order response:", res.data);
      onClose();
    } catch (err) {
      console.error("Failed to place order:", err);
      alert("Failed to place order.");
    }
  };

  const stopPropagation = (e) => e.stopPropagation();

  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-yellow-100 via-orange-100 to-white rounded-2xl w-full sm:w-10/12 md:w-8/12 lg:w-7/12 max-w-3xl p-6 sm:p-8 shadow-lg"
        onClick={stopPropagation}
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">
          Order "{menuItem.name}"
        </h2>

        <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 text-black text-sm sm:text-base"
          />
          <input
            type="text"
            placeholder="Delivery Address"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 text-black text-sm sm:text-base"
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 border rounded-lg hover:bg-gray-100 font-semibold transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmitOrder}
            className="w-full sm:w-auto px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 font-semibold shadow-md transition"
          >
            Submit Order
          </button>
        </div>
      </div>
    </div>
  );
}
