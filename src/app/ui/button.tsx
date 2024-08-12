import React from "react";

export interface buttonProps {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

export default function button({
  children,
  className,
  onClick,
  type,
}: buttonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} p-2 border-2 my-2 w-full rounded-md`}
    >
      {children}
    </button>
  );
}
