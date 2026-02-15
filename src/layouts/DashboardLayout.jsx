import { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  FiUsers,
  FiPackage,
  FiGrid,
  FiSun,
  FiMoon,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { TbLayoutDashboard } from "react-icons/tb";

function DashboardLayout() {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navItems = [
    { to: "/dashboard/users", icon: <FiUsers />, label: "Kullanıcılar" },
    { to: "/dashboard/products", icon: <FiPackage />, label: "Ürünler" },
    { to: "/dashboard/categories", icon: <FiGrid />, label: "Kategoriler" },
  ];

  return (
    <div className="flex min-h-screen bg-background text-content transition-colors">
      <aside
        className={`
          fixed md:static z-40
          h-screen md:h-auto md:min-h-screen w-64
          bg-surface shadow-xl border-r border-gray-200 dark:border-gray-700
          p-6 flex flex-col
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="flex items-center justify-between mb-10">
          <h2
            className="text-2xl font-bold text-primary flex items-center gap-2 cursor-pointer"
            onClick={() => {
              navigate("/dashboard");
              setSidebarOpen(false);
            }}
          >
            <TbLayoutDashboard className="w-6 h-6 text-primary" />
            AdminPanel
          </h2>

          <button
            className="md:hidden text-2xl"
            onClick={() => setSidebarOpen(false)}
          >
            <FiX />
          </button>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-blue-500/30"
                    : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary"
                }`
              }
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
        >
          <FiLogOut />
          <span className="font-medium">Çıkış Yap</span>
        </button>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col">
        <header className="h-20 bg-surface shadow-sm flex items-center justify-between px-6 md:px-8 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-2xl"
            >
              <FiMenu />
            </button>

            <div className="text-gray-400 italic font-light">
              Hoş geldin, Yönetici
            </div>
          </div>

          <button
            onClick={toggleDarkMode}
            className="p-3 rounded-full bg-background hover:ring-2 ring-primary transition-all text-xl"
          >
            {darkMode ? (
              <FiSun className="text-yellow-400" />
            ) : (
              <FiMoon className="text-gray-600" />
            )}
          </button>
        </header>

        <main className="p-6 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;