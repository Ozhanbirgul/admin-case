import BaseModal from "./BaseModal";
import { FiX } from "react-icons/fi";

const ProductDetailModal = ({ product, categoryMap, onClose }) => {
  if (!product) return null;

  return (
    <BaseModal isOpen={!!product} onClose={onClose}>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-white transition"
      >
        <FiX size={20} />
      </button>

      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        {product.title}
      </h2>

      <div className="space-y-2 text-gray-700 dark:text-gray-300">
        <p>
          <strong>Kategori:</strong>{" "}
          {categoryMap?.[product.categoryId] || "Bilinmiyor"}
        </p>

        <p>
          <strong>Fiyat:</strong> {product.price} ₺
        </p>

        <p>
          <strong>Açıklama:</strong> {product.description}
        </p>
      </div>
    </BaseModal>
  );
};

export default ProductDetailModal;