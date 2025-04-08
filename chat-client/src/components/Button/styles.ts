export type ButtonVariantType = 'contained' | 'outlined' | 'text';

export type ButtonSizeType = 'large' | 'medium' | 'small';

export const getButtonVariant = (variant: ButtonVariantType) => {
  switch (variant) {
    case 'contained':
      return 'rounded-md winter:bg-blue-900 winter:text-blue-100 spring:bg-pink-900 spring:text-pink-50 hover:opacity-80 hover:spring:opacity-60 focus:opacity-80 spring:focus:opacity-60 disabled:pointer-events-none disabled:opacity-50';
    case 'text':
      return 'winter:text-white spring:text-pink-950 hover:opacity-80 focus:opacity-80 winter:dark:text-blue-100 spring:dark:text-pink-50';
    default:
      return 'rounded-md border winter:border-blue-600 spring:border-pink-600 bg-white dark:bg-transparent winter:text-blue-600 spring:text-pink-600 hover:opacity-80 hover:spring:opacity-60 focus:opacity-80 spring:focus:opacity-60 winter:dark:border-blue-100 spring:dark:border-pink-100 winter:dark:text-blue-100 spring:dark:text-pink-50 disabled:pointer-events-none disabled:opacity-30';
  }
};

export const getButtonSize = (size: ButtonSizeType) => {
  switch (size) {
    case 'large':
      return 'h-12 text-16-B-24 sm:h-14 w-full sm:text-18-B-28';
    case 'small':
      return 'text-14-M-20 sm:text-16-M-24';
    default:
      return 'h-11 w-full text-12-B-16 sm:text-14-B-20';
  }
};
