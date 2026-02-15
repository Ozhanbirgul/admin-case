import { useState, useEffect } from "react";
import {
  useGetProductsQuery,
  useGetCategoriesTreeQuery,
} from "../services/api";
import ProductRow from "../components/ProductRow";
import Pagination from "../components/Pagination";
import ProductDetailModal from "../components/ProductDetailModal";
import ConfirmDelete from "../components/ConfirmDelete";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

const ProductsPage = ({ selectedCategory: propSelectedCategory }) => {
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(
    propSelectedCategory || ""
  );
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);

  const itemsPerPage = 10;

  const {
    data: productData,
    error,
    isLoading,
  } = useGetProductsQuery({
    page: 1,
    limit: 1000,
    categoryIds: selectedCategory ? [selectedCategory] : [],
  });

  const { data: categoriesData } = useGetCategoriesTreeQuery();

  // Ürünleri state'e ata (kategori değişince de güncellenir)
  useEffect(() => {
    if (productData?.data) {
      setProducts(productData.data);
      setPage(1);
    }
  }, [productData]);

  // Error toast (render içinde değil)
  useEffect(() => {
    if (error) {
      toast.error("Ürün verileri alınamadı!");
    }
  }, [error]);

  // Kategori map oluştur
  const categoryMap = {};
  const buildCategoryMap = (categories) => {
    categories.forEach((cat) => {
      categoryMap[cat.id] = cat.name;
      if (cat.children?.length > 0) {
        buildCategoryMap(cat.children);
      }
    });
  };

  if (categoriesData) buildCategoryMap(categoriesData);

  // Dropdown için kategorileri flatten et
  const flattenCategories = (categories) => {
    let flat = [];
    categories.forEach((cat) => {
      flat.push({ id: cat.id, name: cat.name });
      if (cat.children?.length > 0) {
        flat = flat.concat(flattenCategories(cat.children));
      }
    });
    return flat;
  };

  const allCategories = categoriesData
    ? flattenCategories(categoriesData)
    : [];

  // Pagination hesaplama
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const currentProducts = products.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Silme işlemi
  const handleDeleteConfirmed = (id) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    setProducts((prev) => prev.filter((p) => p.id !== id));
    setDeleteProduct(null);

    toast.success(`"${product.title}" silindi`);
  };

  // Loading state
  if (isLoading) {
    return <Spinner />;
  }

  // Error state
  if (error) {
    return (
      <p className="text-red-500 text-center mt-6">
        Bir hata oluştu!
      </p>
    );
  }

  // Empty state
  if (!products.length) {
    return (
      <div className="text-center py-10 opacity-60">
        Ürün bulunamadı.
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-[rgb(var(--color-text))]">
        Ürünler
      </h1>

      {/* Kategori Filtre */}
      <div className="mb-6 flex items-center gap-4">
        <label className="font-semibold text-[rgb(var(--color-text))]">
          Kategori:
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 rounded border border-gray-300 dark:bg-gray-700 dark:text-white"
        >
          <option value="">Tümü</option>
          {allCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <table className="min-w-full bg-[rgb(var(--color-surface))] shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200 dark:bg-gray-700">
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
              onDelete={(p) => setDeleteProduct(p)}
              onView={(p) => setSelectedProduct(p)}
            />
          ))}
        </tbody>
      </table>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      {/* Detay Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          categoryMap={categoryMap}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Silme Onay Modal */}
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

export default ProductsPage;