
// import { useState, useEffect, useContext } from "react";
// import api from "../services/api";
// import { AuthContext } from "../context/AuthContext";

// export default function MenuItemDetails({ isOpen, onClose, menuItem }) {
//   const { user } = useContext(AuthContext);
//   const [reviews, setReviews] = useState([]);
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");

//   useEffect(() => {
//     if (menuItem) {
//       api.get(`/menu-items/${menuItem.id}/reviews`)
//         .then(res => setReviews(res.data))
//         .catch(err => console.error(err));
//     }
//   }, [menuItem]);

//   const submitReview = async () => {
//     if (!rating || !comment) return alert("Please select rating and write comment");
//     try {
//       const res = await api.post(`/menu-items/${menuItem.id}/reviews`, { rating, comment });
//       setReviews([...reviews, res.data]);
//       setRating(0);
//       setComment("");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 bg-gradient-to-b from-yellow-100 via-orange-100 to-white overflow-y-auto p-4 sm:p-6 lg:p-12">
//       {/* Close button */}
//       <button
//         onClick={onClose}
//         className="absolute top-4 right-4 text-black hover:text-gray-800 text-3xl font-bold"
//       >
//         ×
//       </button>

//       <div className="max-w-4xl mx-auto">
//         {/* Menu item image */}
//         {menuItem?.imageUrl ? (
//           <img
//             src={`http://localhost:8080${menuItem.imageUrl}`}
//             alt={menuItem.name}
//             className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-xl shadow-lg mb-6 sm:mb-8 border-4 border-yellow-400"
//           />
//         ) : (
//           <div className="w-full h-64 sm:h-80 md:h-96 bg-gray-200 rounded-xl mb-6 sm:mb-8 flex items-center justify-center text-gray-500 text-lg font-semibold">
//             No Image
//           </div>
//         )}

//         {/* Menu item info */}
//         <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-black">{menuItem?.name}</h1>
//         <p className="text-gray-800 mb-2 text-sm sm:text-base">{menuItem?.description}</p>
//         <p className="text-yellow-600 font-bold text-2xl sm:text-3xl md:text-3xl mb-6 sm:mb-8">₹{menuItem?.price}</p>

//         {/* Reviews */}
//         <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-black">Reviews</h2>
//         <div className="space-y-4 mb-6 sm:mb-8">
//           {reviews.length > 0 ? (
//             reviews.map(r => (
//               <div key={r.id} className="border-l-4 border-yellow-400 p-4 rounded-lg shadow-sm bg-white">
//                 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2">
//                   <span className="font-semibold text-black">{r.userName}</span>
//                   <span className="text-yellow-500 mt-1 sm:mt-0">{"⭐".repeat(r.rating)}</span>
//                 </div>
//                 <p className="text-gray-700 mb-1 text-sm sm:text-base">{r.comment}</p>
//                 <p className="text-gray-500 text-xs sm:text-sm">{new Date(r.createdAt).toLocaleString()}</p>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500 text-sm sm:text-base">No reviews yet.</p>
//           )}
//         </div>

//         {/* Add review - only if user is logged in */}
//         {user ? (
//           <div className="bg-orange-50 p-4 sm:p-6 rounded-xl shadow-md mb-6 sm:mb-10 border-t-4 border-yellow-400">
//             <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 text-black">Add Your Review</h3>
//             <div className="flex gap-2 mb-3 sm:mb-4">
//               {[1, 2, 3, 4, 5].map(star => (
//                 <span
//                   key={star}
//                   className={`cursor-pointer text-2xl sm:text-3xl md:text-3xl ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
//                   onClick={() => setRating(star)}
//                 >
//                   ★
//                 </span>
//               ))}
//             </div>
//             <textarea
//               value={comment}
//               onChange={e => setComment(e.target.value)}
//               placeholder="Write your comment..."
//               className="w-full border rounded-lg p-2 sm:p-3 mb-3 sm:mb-4 h-24 sm:h-28 md:h-32 resize-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 text-sm sm:text-base"
//             />
//             <button
//               onClick={submitReview}
//               className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-2 sm:py-3 rounded-lg font-semibold text-base sm:text-lg shadow-md transition"
//             >
//               Submit Review
//             </button>
//           </div>
//         ) : (
//           <p className="text-gray-700 text-sm sm:text-base mb-6 sm:mb-10">Please login to submit a review.</p>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function MenuItemDetails({ isOpen, onClose, menuItem }) {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (menuItem) {
      api.get(`/menu-items/${menuItem.id}/reviews`)
        .then(res => setReviews(res.data))
        .catch(err => console.error(err));
    }
  }, [menuItem]);

  const submitReview = async () => {
    if (!rating || !comment) return alert("Please select rating and write comment");
    try {
      const res = await api.post(`/menu-items/${menuItem.id}/reviews`, { rating, comment });
      setReviews([...reviews, res.data]);
      setRating(0);
      setComment("");
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-yellow-100 via-orange-100 to-white overflow-y-auto p-4 sm:p-6 lg:p-12">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-red-600 hover:text-red-800 text-3xl font-bold"
      >
        ×
      </button>

      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        {/* Menu item image */}
        <div className="w-full">
          {menuItem?.imageUrl ? (
            <img
              src={`http://localhost:8080${menuItem.imageUrl}`}
              alt={menuItem.name}
              className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-xl shadow-lg border-4 border-yellow-400"
            />
          ) : (
            <div className="w-full h-64 sm:h-80 md:h-96 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 text-lg sm:text-xl font-semibold">
              No Image
            </div>
          )}
        </div>

        {/* Menu item info */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">{menuItem?.name}</h1>
          <p className="text-gray-800 text-sm sm:text-base">{menuItem?.description}</p>
          <p className="text-yellow-600 font-bold text-2xl sm:text-3xl md:text-3xl">₹{menuItem?.price}</p>
        </div>

        {/* Reviews */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-black">Reviews</h2>
          {reviews.length > 0 ? (
            reviews.map(r => (
              <div key={r.id} className="border-l-4 border-yellow-400 p-4 rounded-lg shadow-sm bg-white">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2">
                  <span className="font-semibold text-black">{r.userName}</span>
                  <span className="text-yellow-500 mt-1 sm:mt-0">{"⭐".repeat(r.rating)}</span>
                </div>
                <p className="text-gray-700 text-sm sm:text-base mb-1">{r.comment}</p>
                <p className="text-gray-500 text-xs sm:text-sm">{new Date(r.createdAt).toLocaleString()}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm sm:text-base">No reviews yet.</p>
          )}
        </div>

        {/* Add review - only if user is logged in */}
        {user ? (
          <div className="bg-orange-50 p-4 sm:p-6 rounded-xl shadow-md border-t-4 border-yellow-400 flex flex-col gap-3">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-black">Add Your Review</h3>
            <div className="flex gap-2 flex-wrap">
              {[1, 2, 3, 4, 5].map(star => (
                <span
                  key={star}
                  className={`cursor-pointer text-2xl sm:text-3xl md:text-3xl ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
                  onClick={() => setRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Write your comment..."
              className="w-full border rounded-lg p-2 sm:p-3 h-24 sm:h-28 md:h-32 resize-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 text-sm sm:text-base"
            />
            <button
              onClick={submitReview}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-2 sm:py-3 rounded-lg font-semibold text-base sm:text-lg shadow-md transition"
            >
              Submit Review
            </button>
          </div>
        ) : (
          <p className="text-gray-700 text-sm sm:text-base">Please login to submit a review.</p>
        )}
      </div>
    </div>
  );
}


