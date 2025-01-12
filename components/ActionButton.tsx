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
      className={`bg-darkText text-black px-4 py-2 rounded-md hover:bg-black ${className}`}
    >
      {children}
    </button>
  );
};

export default ActionButton;
