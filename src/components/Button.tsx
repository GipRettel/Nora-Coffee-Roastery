// src/components/Button.tsx
import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
};

const Button = ({ children, className = "", ...rest }: Props) => {
  return (
    <button
      className={`px-8 py-4 bg-orange-600 text-white font-medium tracking-wider uppercase hover:bg-orange-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;