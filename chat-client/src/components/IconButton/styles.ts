export type IconButtonVariantType = 'contained' | 'outlined' | 'text';

export type IconButtonSizeType = 'large' | 'medium' | 'small';

export const getIconButtonVariant = (variant: IconButtonVariantType) => {
  switch (variant) {
    case 'outlined':
      return 'flex h-14 w-14 items-center justify-center rounded-full border border-primary-900 hover:border-primary-950 hover:bg-primary-100/50 active:border-primary-950 active:bg-primary-200/50 dark:border-primary-100/20 dark:hover:border-primary-100/40 dark:hover:bg-primary-800 dark:active:border-primary-100/60 dark:active:bg-primary-900 disabled:opacity-50 disabled:pointer-events-none';
    case 'contained':
      return 'flex h-20 w-20 items-center justify-center rounded-full border bg-primary-900 shadow-md hover:bg-primary-800 active:bg-primary-900 active:scale-95 dark:bg-primary-50 dark:hover:bg-primary-100 dark:active:bg-primary-200 disabled:opacity-50 disabled:pointer-events-none';
    default:
      return 'disabled:opacity-50 disabled:pointer-events-none';
  }
};

export const getIconSize = (size: IconButtonSizeType) => {
  switch (size) {
    case 'medium':
      return 'w-8 h-8';
    case 'large':
      return 'h-10 w-10';
    default:
      return 'w-5 h-5';
  }
};

export const getIconVariant = (variant: IconButtonVariantType) => {
  switch (variant) {
    case 'outlined':
      return 'text-primary-900 dark:text-primary-100';
    case 'contained':
      return 'text-primary-100 dark:text-primary-900';
    default:
      return 'text-white dark:text-primary-100 hover:opacity-80';
  }
};
