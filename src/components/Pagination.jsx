const Pagination = ({ page, totalPages, onPageChange }) => {
  return (
    <div className="mt-4 flex justify-center gap-2">
      <button
        onClick={() => onPageChange(Math.max(page - 1, 1))}
        disabled={page === 1}
        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
      >
        Önceki
      </button>
      <span className="px-4 py-2 text-[rgb(var(--color-text))]">
        Sayfa {page} / {totalPages}
      </span>
      <button
        onClick={() => onPageChange(Math.min(page + 1, totalPages))}
        disabled={page === totalPages}
        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
      >
        Sonraki
      </button>
    </div>
  );
};

export default Pagination;