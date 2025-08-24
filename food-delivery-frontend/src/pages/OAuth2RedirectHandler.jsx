import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { handleGoogleRedirect } from "../services/oauth";

export default function OAuth2RedirectHandler() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      // const userData = await handleGoogleRedirect();
      const userData = await handleGoogleRedirect();
      if (userData) {
        setUser(userData); // store user in context
        navigate("/menu");  // redirect to menu page
      } else {
        navigate("/login"); // fallback if token is invalid
      }
    })();
  }, [setUser, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-white text-lg">Logging in with Google...</p>
    </div>
  );
}


// import { useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import { handleGoogleRedirect } from "../services/oauth";

// export default function OAuth2RedirectHandler() {
//   const { setUser } = useContext(AuthContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     (async () => {
//       console.log("OAuth2RedirectHandler: started redirect handling");

//       try {
//         const userData = await handleGoogleRedirect();
//         console.log("handleGoogleRedirect returned:", userData);

//         if (userData) {
//           setUser(userData); // store user in context
//           console.log("User set in context, navigating to /menu");
//           navigate("/menu");  // redirect to menu page
//         } else {
//           console.log("No user data received, redirecting to /login");
//           navigate("/login"); // fallback if token is invalid
//         }
//       } catch (error) {
//         console.error("Error in OAuth2RedirectHandler:", error);
//         navigate("/login");
//       }
//     })();
//   }, [setUser, navigate]);

//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <p className="text-white text-lg">Logging in with Google...</p>
//     </div>
//   );
// }

