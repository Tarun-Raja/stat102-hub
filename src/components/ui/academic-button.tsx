import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface AcademicButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "nav-active" | "nav-inactive";
}

const AcademicButton = forwardRef<HTMLButtonElement, AcademicButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          {
            "academic-button-primary": variant === "primary",
            "academic-button-secondary": variant === "secondary",
            "academic-nav-active": variant === "nav-active",
            "academic-nav-inactive px-3 py-1.5 text-sm rounded-xl": variant === "nav-inactive",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
AcademicButton.displayName = "AcademicButton";

export { AcademicButton };