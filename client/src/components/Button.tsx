import { ReactNode, ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gradient";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

export default function Button({ 
  children,
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  icon,
  iconPosition = "left",
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover-elevate active-elevate-2";

  const variantClasses = {
    primary: "bg-primary text-primary-foreground hover:shadow-lg focus:ring-primary",
    secondary: "bg-secondary text-secondary-foreground hover:shadow-md focus:ring-secondary",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground focus:ring-primary",
    ghost: "text-primary hover:bg-primary/10 focus:ring-primary/20",
    gradient: "bg-gradient-to-r from-primary to-red-600 hover:from-red-600 hover:to-primary text-white hover:shadow-xl hover:scale-105 focus:ring-primary"
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2",
    xl: "px-8 py-4 text-lg gap-3"
  };

  const widthClasses = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClasses} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!loading && icon && iconPosition === "left" && icon}
      {children}
      {!loading && icon && iconPosition === "right" && icon}
    </button>
  );
}