const CategoryTree = ({ categories, selectedCategory, onCategorySelect }) => {
  return (
    <div className="flex flex-wrap gap-6">
      {categories.map((cat) => (
        <div
          key={cat.id}
          className={`bg-[rgb(var(--color-surface))] p-4 rounded-xl shadow min-w-[200px] cursor-pointer
            ${selectedCategory === cat.id ? "border-2 border-[rgb(var(--color-primary))]" : ""}
            hover:shadow-lg transition`}
          onClick={() => onCategorySelect(cat.id)}
        >
          {/* Ana kategori */}
          <h3 className="font-semibold text-[rgb(var(--color-text))] mb-2">
            {cat.name}
          </h3>

          {/* Alt kategoriler */}
          {cat.children && cat.children.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {cat.children.map((child) => (
                <span
                  key={child.id}
                  className={`text-sm bg-[rgb(var(--color-background))] text-[rgb(var(--color-text))] px-2 py-1 rounded-full cursor-pointer
                    ${selectedCategory === child.id ? "bg-[rgb(var(--color-primary))] text-white" : ""}
                    hover:bg-[rgb(var(--color-primary))] hover:text-white transition`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onCategorySelect(child.id);
                  }}
                >
                  {child.name}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryTree;