import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  // Function to clear session storage
  const navigator = useNavigate();
  const handleLogout = () => {
    sessionStorage.clear();
    navigator("/signin");
    // Add any additional logout logic here
  };

  return (
    <div>
      <h1>Logout Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
