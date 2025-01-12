"use client";

type ActionButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
};

const ActionButton = ({ onClick, children, className = "" }: ActionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ${className}`}
    >
      {children}
    </button>
  );
};

export default ActionButton;
