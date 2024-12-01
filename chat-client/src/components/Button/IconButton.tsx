import { ButtonHTMLAttributes, cloneElement, ReactElement } from 'react';

type SizeType = 'large' | 'medium' | 'small';
type VariantType = 'contained' | 'outlined' | 'text';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactElement;
  size: SizeType;
  variant: VariantType;
}

const getVariantStyle = (variant: VariantType) => {
  switch (variant) {
    case 'outlined':
      return 'flex h-14 w-14 items-center justify-center rounded-full border border-primary-900 hover:border-primary-950 hover:bg-primary-100/50 active:border-primary-950 active:bg-primary-200/50 dark:border-primary-100/20 dark:hover:border-primary-100/40 dark:hover:bg-primary-800 dark:active:border-primary-100/60 dark:active:bg-primary-900 disabled:opacity-50 disabled:pointer-events-none';
    case 'contained':
      return 'flex h-20 w-20 items-center justify-center rounded-full border bg-primary-900 shadow-md hover:bg-primary-800 active:bg-primary-900 active:scale-95 dark:bg-primary-50 dark:hover:bg-primary-100 dark:active:bg-primary-200 disabled:opacity-50 disabled:pointer-events-none';
    default:
      return 'disabled:opacity-50 disabled:pointer-events-none';
  }
};

const getIconSizeStyle = (size: SizeType) => {
  switch (size) {
    case 'medium':
      return 'w-8 h-8';
    case 'large':
      return 'h-10 w-10';
    default:
      return 'w-5 h-5';
  }
};

const getIconVariantStyle = (variant: VariantType) => {
  switch (variant) {
    case 'outlined':
      return 'text-primary-900 dark:text-primary-100';
    case 'contained':
      return 'text-primary-100 dark:text-primary-900';
    default:
      return 'text-white dark:text-primary-100 hover:opacity-80';
  }
};

export default function IconButton({ icon, onClick, size, type = 'button', variant, ...props }: Props) {
  return (
    <button
      {...props}
      className={getVariantStyle(variant)}
      type={type}
      onClick={(e) => {
        e.currentTarget.blur();
        if (onClick) {
          onClick(e);
        }
      }}
    >
      {cloneElement(icon, { className: `${getIconSizeStyle(size)} ${getIconVariantStyle(variant)}` })}
    </button>
  );
}
