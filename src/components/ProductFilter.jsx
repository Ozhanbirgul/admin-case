const ProductFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="mb-4 flex items-center gap-3">
      <label className="font-semibold text-[rgb(var(--color-text))]">Kategori:</label>
      <select
        value={selectedCategory || ""}
        onChange={(e) => onCategoryChange(e.target.value ? Number(e.target.value) : null)}
        className="p-2 rounded-xl border border-gray-300 dark:bg-gray-700 dark:text-white shadow-sm hover:ring-1 hover:ring-primary focus:outline-none transition"
      >
        <option value="">Tümü</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductFilter;