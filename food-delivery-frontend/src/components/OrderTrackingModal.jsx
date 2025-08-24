
import React, { useEffect, useState } from "react";
import api from "../services/api";

const steps = ["Pending", "Preparing", "Out for Delivery", "Delivered"];

function OrderTrackingModal({ orderId, onClose }) {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/orders/${orderId}`);
        setOrder(res.data);
      } catch (err) {
        console.error("Failed to fetch order", err);
      }
    };

    fetchOrder();

    const interval = setInterval(fetchOrder, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, [orderId]);

  if (!order)
    return (
      <div className="p-6 text-center text-gray-600 text-sm sm:text-base">
        Loading order status...
      </div>
    );

  const statusMap = {
    PENDING: 0,
    PREPARING: 1,
    OUT_FOR_DELIVERY: 2,
    DELIVERED: 3,
  };

  const currentStep = statusMap[order.status] ?? 0;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-yellow-100 via-orange-100 to-white flex items-center justify-center z-50 p-4 sm:p-6">
      <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-sm sm:max-w-md shadow-lg">
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-center text-gray-800">
          Order Tracking
        </h2>

        {/* Stepper */}
        <div className="flex justify-between mb-4 relative">
          {steps.map((step, index) => (
            <div key={index} className="flex-1 flex flex-col items-center relative">
              <div
                className={`w-6 sm:w-8 h-6 sm:h-8 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-base
                  ${index < currentStep ? "bg-green-500" : index === currentStep ? "bg-yellow-500" : "bg-gray-300"}`}
              >
                {index + 1}
              </div>
              <span className="mt-1 sm:mt-2 text-xs sm:text-sm text-center">{step}</span>
              {index < steps.length - 1 && (
                <div
                  className={`absolute top-3 sm:top-3.5 left-6 sm:left-10 w-full h-0.5 sm:h-1 ${index < currentStep ? "bg-green-500" : "bg-gray-300"}`}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* ETA */}
        <p className="text-gray-600 font-semibold text-center mb-4 text-sm sm:text-base">
          Estimated Time: <span className="text-yellow-600">30 Min</span>
        </p>

        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="px-4 sm:px-6 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 text-sm sm:text-base"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderTrackingModal;
