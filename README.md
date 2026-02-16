Admin Panel Case:
- Bu proje, verilen REST API ile entegre çalışan bir Admin Panel uygulamasıdır.
Authentication, ürün ve kategori yönetimi gibi temel admin fonksiyonlarını içermektedir.

🛠️ Kullanılan Teknolojiler
- React (Vite)
- Redux Toolkit
- RTK Query
- React Router DOM
- TailwindCSS
- React Toastify
- React Icons

✨ Özellikler
- JWT Authentication + x-api-key header kullanımı
- Kullanıcı listeleme
- Ürün listeleme + Pagination
- Kategori ağacı
- Modal ile detay ve silme işlemleri
- Responsive tasarım + Dark Mode

⚙️ Kurulum
npm create vite@latest admin-case
cd admin-case
npm install
npm install @reduxjs/toolkit react-redux react-router-dom
npm install -D tailwindcss@3.4.1 postcss autoprefixer
npx tailwindcss init -p
npm install react-icons
npm run dev

Varsayımlar
- Backend API’nin çalışır olduğu varsayılmıştır.
- Login sonrası JWT token döndüğü kabul edilmiştir.
- Pagination yapısını gösterebilmek için bilinçli olarak fazla ürün verisi çekilmiştir.
- Token localStorage’da saklanmaktadır.
