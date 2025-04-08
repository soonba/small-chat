export type IconButtonVariantType = 'contained' | 'outlined' | 'text';

export type IconButtonSizeType = 'large' | 'medium' | 'small';

export const getIconButtonVariant = (variant: IconButtonVariantType) => {
  switch (variant) {
    case 'outlined':
      return 'flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-full border spring:bg-white spring:dark:bg-transparent spring:border-pink-900 hover:spring:border-pink-950 hover:spring:bg-pink-100/50 spring:active:border-pink-950 spring:active:bg-pink-200/50 spring:dark:border-pink-100 dark:hover:spring:border-pink-200 dark:hover:spring:bg-pink-100/50 spring:dark:active:border-pink-200 spring:dark:active:bg-pink-200/50 winter:border-blue-900 hover:winter:border-blue-950 hover:winter:bg-blue-100/50 winter:active:border-blue-950 winter:active:bg-blue-200/50 winter:dark:border-blue-100/20 dark:hover:winter:border-blue-100/40 dark:hover:winter:bg-blue-800 winter:dark:active:border-blue-100/60 winter:dark:active:bg-blue-900 disabled:opacity-50 disabled:pointer-events-none';
    case 'contained':
      return 'flex h-14 w-14 sm:h-20 sm:w-20 items-center justify-center rounded-full border spring:bg-pink-900 shadow-md hover:spring:bg-pink-800 spring:active:bg-pink-900 active:scale-95 spring:dark:bg-pink-50 dark:hover:spring:bg-pink-100 spring:dark:active:bg-pink-200 winter:bg-blue-900 shadow-md hover:winter:bg-blue-800 winter:active:bg-blue-900 active:scale-95 winter:dark:bg-blue-50 dark:hover:winter:bg-blue-100 winter:dark:active:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none';
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
      return 'spring:text-pink-950 spring:dark:text-pink-50 winter:text-blue-900 winter:dark:text-blue-100';
    case 'contained':
      return 'spring:text-pink-50 spring:dark:text-pink-950 winter:text-blue-100 winter:dark:text-blue-900';
    default:
      return 'spring:text-pink-950 spring:dark:text-pink-50 winter:text-white winter:dark:text-blue-100 hover:opacity-80';
  }
};
