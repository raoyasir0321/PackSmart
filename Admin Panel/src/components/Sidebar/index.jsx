import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  Package,
  List,
  Layers,
  ShoppingBag,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Percent,
  Sparkles,
  Tag,
} from "lucide-react";
import { useAuth } from "@/context/AuthProvider";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setTimeout(() => navigate("/"), 0);
  };

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: Home },
    { name: "Products", path: "/admin/products", icon: Package },
    { name: "Categories", path: "/admin/categories", icon: List },
    { name: "Sections", path: "/admin/sections", icon: Layers },
    { name: "Recommendations", path: "/admin/recommendations", icon: Sparkles },
    { name: "Orders", path: "/admin/orders", icon: ShoppingBag },
    { name: "Promotions", path: "/promotions", icon: Tag },
  ];

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-16"
      } bg-gray-800 text-white p-4 flex flex-col transition-all duration-300 ease-in-out`}
      style={{ minHeight: "100vh" }}
    >
      <div className="flex items-center justify-between mb-6">
        {isOpen && <h2 className="text-xl font-bold">Admin Panel</h2>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white hover:text-gray-300 transition-colors"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
      <ul className="space-y-4 flex-1">
        {menuItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded hover:bg-gray-700 transition-colors ${
                  isActive ? "bg-gray-700" : ""
                }`
              }
            >
              <item.icon size={18} />
              {isOpen && <span>{item.name}</span>}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 p-2 rounded bg-red-600 hover:bg-red-700 transition-colors w-full"
        >
          <LogOut size={18} />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
