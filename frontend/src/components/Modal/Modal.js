import React, { useRef, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import "./Modal.css";

const Modal = ({ isOpen, children }) => {
    const [isModalOpen, setModalOpen] = useState(isOpen);
    const modalRef = useRef(null);

    const handleClose = () => {
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
          <div className="modal__wrapper">
              <IoClose className="modal__close_icon" onClick={handleClose} size={20} />
          {children}
          </div>
      </dialog>
    );
}

export default Modal;