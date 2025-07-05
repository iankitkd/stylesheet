import React from 'react';

interface ModalWrapperProps {
  children: React.ReactNode;
  title: string;
  onClose: () => void;
}

export default function ModalWrapper({ children, title, onClose }: ModalWrapperProps) {
  const handleBackdropClick = () => {
    onClose();
  };
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-black/60"
      onClick={handleBackdropClick}
    >
      <div
        className="relative w-full max-w-md p-6 bg-background rounded-2xl shadow-xl"
        onClick={handleCardClick}
      >
        <button
          onClick={onClose}
          className="absolute top-1 right-1 px-2 py-1 font-bold text-xl text-black cursor-pointer hover:bg-secondary rounded-xl"
          aria-label="Close modal"
        >
          ✕
        </button>
        <h2 className="pb-2 font-semibold text-2xl text-center text-primary">{title}</h2>
        {children}
      </div>
    </div>
  );
}
