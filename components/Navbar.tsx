"use client";

import axios from "axios";
import { useState, useEffect } from "react";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedin") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const logout = async () => {
    try {
      const result = await axios.post("/api/auth/logout");
      console.log(result)
      localStorage.removeItem("loggedin");
    

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="h-20 w-[95%] px-10 flex items-center justify-between border bg-blue-400 mx-auto rounded-2xl">
      <div className="flex items-center">
        <img src="/Todo.webp" alt="Logo" width={40} height={40} />
      </div>

      <div className="flex gap-6">
        <a
          href="/contact"
          className="h-10 w-24 flex items-center justify-center text-white text-lg rounded-lg hover:bg-blue-500 transition"
        >
          Contact
        </a>

        {!isLoggedIn ? (
          <a
            href="/signup"
            className="h-10 w-24 flex items-center justify-center text-white text-lg rounded-lg hover:bg-blue-500 transition"
          >
            Register
          </a>
        ) : (
          <button
            onClick={logout}
            className="h-10 w-24 flex items-center justify-center text-white text-lg rounded-lg hover:bg-blue-500 transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
