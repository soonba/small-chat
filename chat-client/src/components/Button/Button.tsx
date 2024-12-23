import { ButtonHTMLAttributes } from 'react';

type VariantType = 'contained' | 'outlined' | 'text';
type SizeType = 'large' | 'medium' | 'small';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: SizeType;
  text: string;
  variant: VariantType;
  isFullWidth?: boolean;
}

const getStyle = (variant: VariantType) => {
  switch (variant) {
    case 'contained':
      return 'rounded-md bg-primary-900 text-primary-100 hover:opacity-80 disabled:pointer-events-none disabled:opacity-50';
    case 'text':
      return 'text-white hover:opacity-80 dark:text-primary-100';
    default:
      return 'rounded-md border border-primary-600 bg-white dark:bg-transparent text-primary-600 hover:opacity-80 dark:border-primary-100 dark:text-primary-100 disabled:pointer-events-none disabled:opacity-30';
  }
};

const getSize = (size: SizeType) => {
  switch (size) {
    case 'large':
      return 'h-14 w-full text-18-B-28';
    case 'small':
      return 'text-16-M-24';
    default:
      return 'h-11 w-full text-14-B-20';
  }
};

export default function Button({ onClick, size, text, type = 'button', variant, ...props }: Props) {
  return (
    <button
      {...props}
      className={`${getStyle(variant)} ${getSize(size)}`}
      type={type}
      onClick={(e) => {
        e.currentTarget.blur();
        if (onClick) {
          onClick(e);
        }
      }}
    >
      {text}
    </button>
  );
}
