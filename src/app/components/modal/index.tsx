import { useState, useEffect } from "react";
import { GrFormClose } from "react-icons/gr";

interface ModalProps {
  isOpen: boolean;
  hideClose?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ isOpen, onClose, children, hideClose }: ModalProps) {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setModalOpen(false);
    onClose();
  };

  return (
    <>
      {modalOpen ? (
        <div className="fixed inset-0 z-50  flex items-center justify-center overflow-auto bg-gray-500 bg-opacity-75">
          <div className="relative w-full max-w-[453px] p-[70px] mx-auto my-8 bg-white rounded-md shadow-lg">
            {!hideClose && (
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  className="text-gray-700 hover:text-gray-900"
                  onClick={handleClose}
                >
                  <span className="sr-only">Close</span>
                  <GrFormClose size={24} />
                </button>
              </div>
            )}

            {children}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Modal;
