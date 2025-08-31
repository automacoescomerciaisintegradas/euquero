import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

const Card = ({ children, className = "", hover = false }: CardProps) => {
  const baseClasses = "bg-white rounded-lg shadow-lg border border-gray-200";
  const hoverClasses = hover
    ? "transition-transform duration-300 hover:scale-105 hover:shadow-xl"
    : "";

  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
