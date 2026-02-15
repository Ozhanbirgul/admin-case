const ProductRow = ({ product, categoryMap, onDelete, onView }) => {
  return (
    <tr className="border-b hover:bg-gray-50 dark:hover:bg-gray-700">
      <td className="py-3 px-6 text-[rgb(var(--color-text))]">{product.title}</td>
      <td className="py-3 px-6 text-[rgb(var(--color-text))]">{product.price} ₺</td>
      <td className="py-3 px-6">
        <span
          className={`px-2 py-1 rounded-full text-white text-sm ${
            product.status === "active" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {product.status}
        </span>
      </td>
      <td className="py-3 px-6 text-[rgb(var(--color-text))]">
        {categoryMap[product.category_id] || "-"}
      </td>
      <td className="py-3 px-6 flex gap-2">
        <button
          onClick={() => onView(product)}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Detay
        </button>
        <button
          onClick={() => onDelete(product)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Sil
        </button>
      </td>
    </tr>
  );
};

export default ProductRow;