export const handleLogout = async (token) => {
  try {
    const response = await fetch(
      "https://bookclubbrothers-backend.onrender.com/users/logout",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json",
          Authorization: `Bearer ${token}`},
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(data.error);
    }
  } catch (err) {
    console.error(err);
  }
};
