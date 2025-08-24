
import { useState, useEffect } from "react";
import api from "../services/api"; 
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");
      setCart(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching cart:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedItems = cart.items.map(item =>
      item.id === itemId
        ? { ...item, quantity: newQuantity, total: item.price * newQuantity }
        : item
    );
    const newGrandTotal = updatedItems.reduce((sum, item) => sum + item.total, 0);
    setCart({ ...cart, items: updatedItems, grandTotal: newGrandTotal });
  };

  const handleRemoveItem = (itemId) => {
    const updatedItems = cart.items.filter(item => item.id !== itemId);
    const newGrandTotal = updatedItems.reduce((sum, item) => sum + item.total, 0);
    setCart({ ...cart, items: updatedItems, grandTotal: newGrandTotal });
  };

  const isButtonDisabled = !deliveryAddress || !mobileNumber;

  const placeOrder = async () => {
    if (isButtonDisabled) {
      alert("Please provide delivery address and mobile number to proceed.");
      return;
    }

    try {
      await api.post(
        "/orders/cart",
        null,
        {
          params: { deliveryAddress, mobileNumber },
          withCredentials: true,
        }
      );
      alert("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Failed to place order");
    }
  };

  if (loading) return <p className="text-center mt-20 text-gray-600">Loading cart...</p>;

  if (!cart || cart.items.length === 0) {
    return (
      <div className="font-poppins flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-white p-4 sm:p-6">
        <div className="bg-white rounded-2xl shadow-md border border-yellow-200 p-6 text-center max-w-md w-full">
          <p className="text-2xl mb-2">🛒 Your cart is empty!</p>
          <p className="text-gray-600">Add some delicious items from the menu to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-white p-4 sm:p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <h2 className="font-poppins text-3xl sm:text-4xl font-bold mb-6 text-center text-yellow-800">Your Cart</h2>

        <div className="space-y-4">
          {cart.items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <div className="flex-1 mb-2 sm:mb-0">
                <p className="font-poppins font-semibold text-lg text-yellow-800">{item.itemName}</p>
                <p className="text-gray-600">
                  ₹{item.price} × {item.quantity} = ₹{item.total}
                </p>
              </div>

              <div className="flex gap-2 items-center w-full sm:w-auto">
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                  className="border rounded-lg px-3 py-1 w-full sm:w-20 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                />
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition w-full sm:w-auto"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="font-poppins mt-6 flex flex-col sm:flex-row justify-between items-center font-bold text-xl text-yellow-800">
          <span >Total:</span>
          <span>₹{cart.grandTotal}</span>
        </div>

        <div className="mt-6 p-4 bg-white rounded-2xl shadow-md space-y-3">
          <input
            type="text"
            placeholder="Delivery Address"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Mobile Number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
          />
        </div>

        <button
          onClick={placeOrder}
          disabled={isButtonDisabled}
          className={`mt-6 w-full px-4 py-3 rounded-2xl text-white font-semibold transition ${
            isButtonDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
