import BaseModal from "./BaseModal";

const ConfirmDelete = ({ isOpen, itemName, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <BaseModal isOpen={isOpen} onClose={onCancel}>
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        Silme Onayı
      </h2>

      <p className="mb-6 text-gray-700 dark:text-gray-300">
        "{itemName}" adlı ürünü silmek istediğinize emin misiniz?
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 hover:opacity-80 transition"
        >
          Vazgeç
        </button>

        <button
          onClick={onConfirm}
          className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
        >
          Sil
        </button>
      </div>
    </BaseModal>
  );
};

export default ConfirmDelete;