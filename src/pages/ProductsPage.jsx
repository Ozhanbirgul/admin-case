import { useState, useEffect, useMemo } from "react";
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

const ProductsPage = () => {
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
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
  });

  const { data: categoriesData } = useGetCategoriesTreeQuery();

  useEffect(() => {
    if (productData?.data) {
      setProducts(productData.data);
      setPage(1);
    }
  }, [productData]);

  useEffect(() => {
    if (error) {
      toast.error("Ürün verileri alınamadı!");
    }
  }, [error]);

  const categoryMap = useMemo(() => {
    const map = {};

    const buildMap = (categories) => {
      categories.forEach((cat) => {
        map[cat.id] = cat.name;
        if (cat.children?.length > 0) {
          buildMap(cat.children);
        }
      });
    };

    if (categoriesData) buildMap(categoriesData);

    return map;
  }, [categoriesData]);

  // dropdown için flatten
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

  // frontend filter
  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;

    return products.filter(
      (p) =>
        Number(p.categoryId || p.category_id) ===
        Number(selectedCategory)
    );
  }, [products, selectedCategory]);

  // pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleDeleteConfirmed = (id) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    setProducts((prev) => prev.filter((p) => p.id !== id));
    setDeleteProduct(null);

    toast.success(`"${product.title}" silindi`);
  };

  if (isLoading) return <Spinner />;

  if (error) {
    return (
      <p className="text-red-500 text-center mt-6">
        Bir hata oluştu!
      </p>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Ürünler
      </h1>

      {/* Kategori Filtre */}
      <div className="mb-6 flex items-center gap-4">
        <label className="font-semibold">
          Kategori:
        </label>
        <select
          value={selectedCategory ?? ""}
          onChange={(e) => {
            setSelectedCategory(
              e.target.value ? Number(e.target.value) : null
            );
            setPage(1);
          }}
          className="p-2 rounded border border-gray-300"
        >
          <option value="">Tümü</option>
          {allCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-10 opacity-60">
          Ürün bulunamadı.
        </div>
      ) : (
        <>
          <table className="min-w-full shadow-md rounded-lg overflow-hidden">
            <thead>
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
        </>
      )}

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          categoryMap={categoryMap}
          onClose={() => setSelectedProduct(null)}
        />
      )}

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