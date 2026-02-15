import { useState } from "react";
import { useLoginMutation } from "../services/api";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi"; 
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Şifre görünürlüğü için state
  const [showSuggestion, setShowSuggestion] = useState(false);

  const [login, { isLoading }] = useLoginMutation(); // RTK Query'nin kendi isLoading özelliğini kullanıyoruz
  const navigate = useNavigate();

  const handleSuggestionClick = () => {
    setEmail("px1923@pixelance.com.tr");
    setPassword("Admin123!");
    setShowSuggestion(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basit Validasyon
    if (!email || !password) {
      return toast.warn("Lütfen tüm alanları doldurun.");
    }

    try {
      // unwrap() hata durumunda catch bloğuna düşmesini sağlar
      const result = await login({ email, password }).unwrap();
      
      if (result?.token) {
        localStorage.setItem("token", result.token);
        // OPSİYONEL: Buraya dispatch(setCredentials(result)) ekleyerek Redux state güncellenebilir.
        toast.success("Giriş başarılı! Hoş geldiniz.");
        navigate("/dashboard");
      }
    } catch (err) {
      // API'den gelen spesifik hata mesajını göstermeliö
      const errorMsg = err?.data?.message || "Giriş başarısız! Bilgilerinizi kontrol edin.";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border border-gray-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">Giriş Yap</h2>
          <p className="text-gray-500 mt-2 text-sm">Devam etmek için hesabınıza erişin</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* EMAIL */}
          <div className="relative">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">E-Posta</label>
            <div className="relative mt-1">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-blue-500 transition-all border border-transparent focus:bg-white"
                placeholder="E-posta girin"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setShowSuggestion(true)}
                onBlur={() => setTimeout(() => setShowSuggestion(false), 200)}
                required
              />
            </div>

            {showSuggestion && email === "" && (
              <div 
                className="absolute z-10 mt-2 w-full bg-blue-50 border border-blue-100 rounded-xl shadow-lg p-3 text-sm cursor-pointer hover:bg-blue-100 transition animate-in fade-in slide-in-from-top-1"
                onMouseDown={handleSuggestionClick} // onClick yerine onMouseDown blur çakışmasını önler!
              >
                <span className="text-blue-600 font-medium">Hızlı Giriş:</span> px1923@pixelance.com.tr
              </div>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Şifre</label>
            <div className="relative mt-1">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-12 pr-12 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-blue-500 transition-all border border-transparent focus:bg-white"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {/* Şifre Göster/Gizle Butonu */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 rounded-2xl font-bold text-white transition-all shadow-lg ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98]"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Giriş Yapılıyor...
              </div>
            ) : "Giriş Yap"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;