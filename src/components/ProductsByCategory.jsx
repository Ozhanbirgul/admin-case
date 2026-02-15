import { useState } from "react";
import { useGetProductsQuery, useGetCategoriesTreeQuery } from "../services/api";
import ProductRow from "./ProductRow";
import Pagination from "./Pagination";

const ProductsByCategory = ({ categoryIds }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 10; // frontend pagination için

  // Tüm ürünleri tek seferde çekiyoruz (limit yüksek)
  const { data: productData, error, isLoading } = useGetProductsQuery({ page: 1, limit: 1000 });
  const { data: categoriesData } = useGetCategoriesTreeQuery();

  // Kategori map oluşturalım
  const categoryMap = {};
  const buildCategoryMap = (categories) => {
    categories.forEach((cat) => {
      categoryMap[cat.id] = cat.name;
      if (cat.children && cat.children.length > 0) buildCategoryMap(cat.children);
    });
  };
  if (categoriesData) buildCategoryMap(categoriesData);

  if (isLoading) return <p>Yükleniyor...</p>;
  if (error) return <p>Bir hata oluştu!</p>;

  // Sadece seçili kategori ID’lerine ait ürünleri filtrele
  const filteredProducts = productData?.data.filter((p) =>
    categoryIds.includes(p.category_id)
  ) || [];

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Frontend pagination slice
  const startIndex = (page - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  if (filteredProducts.length === 0) return <p>Bu kategoriye ait ürün bulunamadı.</p>;

  return (
    <div>
      <table className="min-w-full bg-[rgb(var(--color-surface))] shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-300 dark:bg-gray-800">
          <tr>
            <th className="py-3 px-6 text-left">Ürün Adı</th>
            <th className="py-3 px-6 text-left">Fiyat</th>
            <th className="py-3 px-6 text-left">Durum</th>
            <th className="py-3 px-6 text-left">Kategori</th>
            <th className="py-3 px-6 text-left">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <ProductRow key={product.id} product={product} categoryMap={categoryMap} />
          ))}
        </tbody>
      </table>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default ProductsByCategory;