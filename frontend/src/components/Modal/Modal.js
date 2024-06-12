import React, { useRef, useEffect, useState } from "react";
import "./Modal.css";

const Modal = ({ isOpen, hasCloseBtn = true, onClose, children }) => {
    const [isModalOpen, setModalOpen] = useState(isOpen);
    const modalRef = useRef(null);

    const handleClose = () => {
        if(onClose) {
            onClose();
        }
        setModalOpen(false);
    };

    const handleKeyDown = (event) => {
        if(event.key === "Escape") {
            handleClose();
        }
    };

    useEffect(() => {
        setModalOpen(isOpen);
    });

    useEffect(() => {
        const modalElement = modalRef.current;

        if(modalElement)
        {
            if(isModalOpen)
            {
                modalElement.showModal();
            }
            else
            {
                modalElement.close();
            }
        }
    }, [isModalOpen]);

    return (
      <dialog ref={modalRef} onKeyDown={handleKeyDown} className="modal">
          {hasCloseBtn && (
            <button className="modal__close_btn" onClick={handleClose}>
                Close
            </button>
          )}
          {children}
      </dialog>
    );
}

export default Modal;