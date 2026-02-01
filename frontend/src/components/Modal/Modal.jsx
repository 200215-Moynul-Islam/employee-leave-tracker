import "./Modal.css";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";

function Modal({ onClose, className, children }) {
  const modalRoot = document.body;
  const modalRef = useRef(null);
  const previouslyFocusedElementRef = useRef(null);
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;

  useEffect(() => {
    // Save the element that was focused before opening modal
    previouslyFocusedElementRef.current = document.activeElement;

    // Move focus into the modal
    modalRef.current?.focus();

    // Freeze background scroll (scrollbar will not be visible)
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    const handleKeyDown = (event) => {
      //Escape key closes modal
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = modalRef.current.querySelectorAll(
        'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length === 0) {
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else {
        // Tab
        if (document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      // Restore background scroll
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";

      // Restore focus to previously focused element
      previouslyFocusedElementRef.current?.focus();
    };
  }, []);

  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className={`modal ${className}`}
        ref={modalRef}
        tabIndex="-1"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-button" onClick={onClose}>
          <X size={20} color="grey" />
        </button>
        {children}
      </div>
    </div>,
    modalRoot // Portal target (Modal will be rendered as a child of this container)
  );
}

export default Modal;
