import { useState } from "react";
import { useGetCategoriesTreeQuery } from "../services/api";
import ProductsByCategory from "../components/ProductsByCategory";

const CategoriesPage = () => {
  const { data: categoriesData, isLoading } = useGetCategoriesTreeQuery();
  const [expandedCategory, setExpandedCategory] = useState(null); // accordion açılan kategori
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]); // ürünleri göstermek için

  if (isLoading) return <p>Yükleniyor...</p>;

  const getAllCategoryIds = (cat) => {
    let ids = [cat.id];
    if (cat.children && cat.children.length > 0) {
      cat.children.forEach((child) => {
        ids = ids.concat(getAllCategoryIds(child));
      });
    }
    return ids;
  };

  const handleCategoryClick = (cat) => {
    if (cat.children && cat.children.length > 0) {
      // Alt kategoriler varsa aç
      setExpandedCategory(expandedCategory === cat.id ? null : cat.id);
      setSelectedCategoryIds([]); // alt kategori seçeneği bekleniyor
    } else {
      // Alt kategori yoksa direkt ürünleri göster
      setExpandedCategory(null);
      setSelectedCategoryIds([cat.id]);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-[rgb(var(--color-text))]">
        Kategoriler
      </h1>

      {/* Ana kategori kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {categoriesData?.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleCategoryClick(cat)}
            className="p-4 bg-[rgb(var(--color-surface))] rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-all"
          >
            <div className="font-semibold text-[rgb(var(--color-text))]">{cat.name}</div>
            {cat.children && cat.children.length > 0 && (
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                {cat.children.map((child) => child.name).join(", ")}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Alt kategoriler accordion */}
      {expandedCategory && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-[rgb(var(--color-text))]">
            Alt Kategoriler
          </h2>
          <div className="flex flex-wrap gap-3">
            {categoriesData
              .find((c) => c.id === expandedCategory)
              ?.children.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setSelectedCategoryIds(getAllCategoryIds(sub))}
                  className="px-4 py-2 bg-blue-100 dark:bg-blue-800 rounded-lg text-[rgb(var(--color-text))] hover:bg-blue-200 dark:hover:bg-blue-700 transition-all"
                >
                  {sub.name}
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Ürünler */}
      {selectedCategoryIds.length > 0 && (
        <div className="mt-6">
          <ProductsByCategory categoryIds={selectedCategoryIds} />
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;