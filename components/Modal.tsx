import React, { useState, useEffect } from 'react';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  const [isZoomedIn, setIsZoomedIn] = useState(false);

  useEffect(() => {
    setIsZoomedIn(true);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className={`relative z-50 transition-transform duration-300 ${isZoomedIn ? 'scale-100' : 'scale-0'}`}>
        <div className="relative bg-white w-[80%] h-[75%] mx-auto p-4 rounded overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded z-10"
          >
            Close
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export { Modal };
