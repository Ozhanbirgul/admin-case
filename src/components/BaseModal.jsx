import { useEffect, useState } from "react";

const BaseModal = ({ isOpen, onClose, children }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    setVisible(true);

    const handleEsc = (e) => {
      if (e.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => onClose(), 300);
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleClose}
      className={`fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative p-6 rounded-2xl shadow-xl w-[420px] max-w-full transform transition-all duration-300 ${
          visible ? "scale-100" : "scale-95"
        }`}
        style={{
          backgroundColor: "rgb(var(--color-surface))",
          color: "rgb(var(--color-text))",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default BaseModal;