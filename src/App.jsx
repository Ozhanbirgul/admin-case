// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import UsersPage from "./pages/UsersPage";
import ProductsPage from "./pages/ProductsPage";
import CategoriesPage from "./pages/CategoriesPage";
import WelcomePage from "./pages/WelcomePage";

function App() {
  return (
    <>
      {/* ToastContainer sadece bir kez ekleniyor */}
      <Toaster position="top-right" reverseOrder={false} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Routes>
        {/* Default yönlendirme */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Login sayfası */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard Layout protected route */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* Karşılama sayfası */}
          <Route index element={<WelcomePage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="categories" element={<CategoriesPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
