import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  padding?: "sm" | "md" | "lg";
  shadow?: "sm" | "md" | "lg" | "xl";
  hover?: boolean;
}

export default function Card({ 
  children, 
  className = "",
  title,
  subtitle,
  padding = "lg",
  shadow = "lg",
  hover = false
}: CardProps) {
  const paddingClasses = {
    sm: "p-4",
    md: "p-6", 
    lg: "p-8"
  };

  const shadowClasses = {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl"
  };

  return (
    <div 
      className={`bg-white rounded-2xl border border-gray-100 ${paddingClasses[padding]} ${shadowClasses[shadow]} ${hover ? 'hover-elevate cursor-pointer' : ''} transition-all duration-200 ${className}`}
      data-testid="card-container"
    >
      {(title || subtitle) && (
        <div className="mb-6">
          {title && (
            <h3 className="text-xl font-semibold text-gray-900 mb-2" data-testid="text-card-title">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-gray-600" data-testid="text-card-subtitle">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}