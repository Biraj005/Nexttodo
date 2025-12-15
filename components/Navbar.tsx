"use client";

function Navbar() {
  
  return (
    <nav className="h-20 w-[95%] px-10 flex items-center justify-between border bg-blue-400 mx-auto rounded-2xl">
      <div className="flex items-center">
        <img src="/logo.png" alt="Logo" width={40} height={40} />
      </div>

      <div className="flex gap-6">
        <a
          href="/contact" 
          className="h-10 w-24 flex items-center justify-center text-white text-lg rounded-lg hover:bg-blue-500 transition"
        >
          Contact
        </a>

        <a
          href="/signup"
          className="h-10 w-24 flex items-center justify-center text-white text-lg rounded-lg hover:bg-blue-500 transition"
        >
          Register
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
