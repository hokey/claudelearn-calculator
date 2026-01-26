import React from 'react';

export type ButtonVariant = 'digit' | 'operation' | 'function' | 'equals';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: ButtonVariant;
  span?: number;
  ariaLabel?: string;
  active?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = 'digit',
  span = 1,
  ariaLabel,
  active = false,
}) => {
  return (
    <button
      className={`calc-button calc-button--${variant}`}
      onClick={onClick}
      style={{ gridColumn: span > 1 ? `span ${span}` : undefined }}
      aria-label={ariaLabel || label}
      data-active={active}
      type="button"
    >
      {label}
    </button>
  );
};
