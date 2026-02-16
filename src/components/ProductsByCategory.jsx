import { useState, useMemo } from "react";
import { useGetProductsQuery, useGetCategoriesTreeQuery } from "../services/api";
import ProductRow from "./ProductRow";
import Pagination from "./Pagination";
import ProductDetailModal from "./ProductDetailModal";
import ConfirmDelete from "./ConfirmDelete";

const ProductsByCategory = ({ categoryIds }) => {
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);

  const itemsPerPage = 10;

  const { data: productData, error, isLoading } =
    useGetProductsQuery({ page: 1, limit: 1000 });

  const { data: categoriesData } = useGetCategoriesTreeQuery();

  // ✅ categoryMap oluştur
  const categoryMap = useMemo(() => {
    const map = {};

    const buildMap = (categories) => {
      categories.forEach((cat) => {
        map[cat.id] = cat.name;
        if (cat.children?.length > 0) buildMap(cat.children);
      });
    };

    if (categoriesData) buildMap(categoriesData);

    return map;
  }, [categoriesData]);

  if (isLoading) return <p>Yükleniyor...</p>;
  if (error) return <p>Bir hata oluştu!</p>;

  // ✅ Seçili kategoriye göre filtrele
  const filteredProducts =
    productData?.data.filter((p) =>
      categoryIds.includes(p.category_id)
    ) || [];

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleDeleteConfirmed = (id) => {
    setDeleteProduct(null);
    // burada istersen backend delete mutation da ekleyebilirsin
  };

  if (filteredProducts.length === 0)
    return <p>Bu kategoriye ait ürün bulunamadı.</p>;

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
            <ProductRow
              key={product.id}
              product={product}
              categoryMap={categoryMap}
              onView={(p) => setSelectedProduct(p)}     // 🔥 EKLENDİ
              onDelete={(p) => setDeleteProduct(p)}     // 🔥 EKLENDİ
            />
          ))}
        </tbody>
      </table>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      {/* ✅ Detay Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          categoryMap={categoryMap}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* ✅ Silme Modal */}
      <ConfirmDelete
        isOpen={!!deleteProduct}
        itemName={deleteProduct?.title || ""}
        onCancel={() => setDeleteProduct(null)}
        onConfirm={() =>
          handleDeleteConfirmed(deleteProduct.id)
        }
      />
    </div>
  );
};

export default ProductsByCategory;