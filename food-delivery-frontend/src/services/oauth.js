
// import api from "./api";

// export async function handleGoogleRedirect() {
//   const params = new URLSearchParams(window.location.search);
//   const token = params.get("token");

//   if (token) {
 
//     localStorage.setItem("token", token);

//     try {
//       const response = await api.get("/auth/me", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return response.data;
//     } catch (err) {
//       console.error("Failed to fetch user profile", err);
//     }
//   }

//   return null;
// }



import api from "./api";

export async function handleGoogleRedirect() {
  console.log("handleGoogleRedirect: started");

  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  console.log("Token from URL:", token);

  if (token) {
    localStorage.setItem("token", token);
    console.log("Token saved to localStorage");

    try {
       console.log("Token saved to localStorage",token);
       console.log("Token saved to localStorage",localStorage.getItem("token"));
      const response = await api.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("API /auth/me response:", response.data);
      return response.data;
    } catch (err) {
      console.error("Failed to fetch user profile:", err.response?.data || err.message);
    }
  } else {
    console.log("No token found in URL params");
  }

  return null;
}
