export type IconButtonVariantType = 'contained' | 'outlined' | 'text';

export type IconButtonSizeType = 'large' | 'medium' | 'small';

export const getIconButtonVariant = (variant: IconButtonVariantType) => {
  switch (variant) {
    case 'outlined':
      return 'flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-full border spring:bg-white dark:spring:bg-transparent spring:border-pink-900 hover:spring:border-pink-950 hover:spring:bg-pink-100/50 active:spring:border-pink-950 active:spring:bg-pink-200/50 dark:spring:border-pink-100 dark:hover:spring:border-pink-200 dark:hover:spring:bg-pink-100/50 dark:active:spring:border-pink-200 dark:active:spring:bg-pink-200/50 winter:border-blue-900 hover:winter:border-blue-950 hover:winter:bg-blue-100/50 active:winter:border-blue-950 active:winter:bg-blue-200/50 dark:winter:border-blue-100/20 dark:hover:winter:border-blue-100/40 dark:hover:winter:bg-blue-800 dark:active:winter:border-blue-100/60 dark:active:winter:bg-blue-900 disabled:opacity-50 disabled:pointer-events-none';
    case 'contained':
      return 'flex h-14 w-14 sm:h-20 sm:w-20 items-center justify-center rounded-full border spring:bg-pink-900 shadow-md hover:spring:bg-pink-800 active:spring:bg-pink-900 active:scale-95 dark:spring:bg-pink-50 dark:hover:spring:bg-pink-100 dark:active:spring:bg-pink-200 winter:bg-blue-900 shadow-md hover:winter:bg-blue-800 active:winter:bg-blue-900 active:scale-95 dark:winter:bg-blue-50 dark:hover:winter:bg-blue-100 dark:active:winter:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none';
    default:
      return 'disabled:opacity-50 disabled:pointer-events-none';
  }
};

export const getIconSize = (size: IconButtonSizeType) => {
  switch (size) {
    case 'medium':
      return 'h-6 w-6 sm:w-8 sm:h-8';
    case 'large':
      return 'h-8 w-8 sm:h-10 sm:w-10';
    default:
      return 'w-5 h-5';
  }
};

export const getIconVariant = (variant: IconButtonVariantType) => {
  switch (variant) {
    case 'outlined':
      return 'spring:text-pink-950 dark:spring:text-pink-50 winter:text-blue-900 dark:winter:text-blue-100';
    case 'contained':
      return 'spring:text-pink-50 dark:spring:text-pink-950 winter:text-blue-100 dark:winter:text-blue-900';
    default:
      return 'spring:text-pink-950 dark:spring:text-pink-50 winter:text-white dark:winter:text-blue-100 hover:opacity-80';
  }
};
