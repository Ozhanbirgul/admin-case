import {
  FiUsers,
  FiPackage,
  FiGrid,
  FiArrowRight,
  FiActivity,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function WelcomePage() {
  const navigate = useNavigate();

  const stats = [
    {
      label: "Kullanıcılar",
      value: "128",
      icon: <FiUsers />,
      color: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      path: "/dashboard/users",
    },
    {
      label: "Ürünler",
      value: "1,042",
      icon: <FiPackage />,
      color: "text-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      path: "/dashboard/products",
    },
    {
      label: "Kategoriler",
      value: "12",
      icon: <FiGrid />,
      color: "text-amber-500",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      path: "/dashboard/categories",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 py-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-[rgb(var(--color-text))] mb-2">
            Genel Bakış
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Sistemdeki son durumu buradan takip edebilirsiniz.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-surface dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
            Sistem Çevrimiçi
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, i) => (
          <div
            key={i}
            onClick={() => navigate(stat.path)}
            className="group relative bg-surface dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-pointer"
          >
            <div
              className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform`}
            >
              {stat.icon}
            </div>
            <h3 className="text-gray-500 dark:text-gray-400 font-bold text-sm uppercase tracking-widest">
              {stat.label}
            </h3>
            <p className="text-4xl font-black text-gray-900 dark:text-white mt-2">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-blue-600 dark:to-blue-700 p-10 rounded-2xl text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
        <div className="space-y-4 text-center md:text-left">
          <h2 className="text-3xl font-bold italic tracking-tight">
            Hızlı Başlangıç Rehberi
          </h2>
          <p className="text-gray-300 max-w-md">
            Ürün eklemek için ürünler sekmesine, kategori ağacını düzenlemek
            için kategoriler sekmesine gidin.
          </p>
          <button
            onClick={() => navigate("/dashboard/products")}
            className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
          >
            Hemen Başla <FiArrowRight />
          </button>
        </div>
        <div className="text-9xl opacity-20">
          <FiActivity />
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
