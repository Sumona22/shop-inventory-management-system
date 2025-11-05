import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("admin");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ username, role: role as "admin" | "storeManager" | "storeStaff" | "storeCashier" });
    if (role === "admin") navigate("/admin");
    else if (role === "storeManager") navigate("/store-manager");
    else if (role === "storeStaff") navigate("/store-staff");
    else if (role === "storeCashier") navigate("/store-cashier");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Login</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded w-full px-3 py-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border rounded w-full px-3 py-2"
          >
            <option value="admin">Admin</option>
            <option value="storeManager">Store Manager</option>
            <option value="storeStaff">Store Staff</option>
            <option value="storeCashier">Store Cashier</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
