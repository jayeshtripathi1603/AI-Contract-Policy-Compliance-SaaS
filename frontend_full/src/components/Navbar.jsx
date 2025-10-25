import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav className="bg-slate-900 text-white p-4 flex justify-between">
      <div className="font-bold">AI Contract SaaS</div>
      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <span>{user.name}</span>
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            {user.role === "admin" && <Link to="/admin">Admin</Link>}
            <button onClick={logout} className="bg-white text-black px-2 py-1 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}
