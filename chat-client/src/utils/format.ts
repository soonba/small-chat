import { ClassValue, clsx } from 'clsx/lite';
import { extendTailwindMerge } from 'tailwind-merge';

const colors = Array.from({ length: 19 }, (_, idx) => 50 * (idx + 1));
const customColors = ['background-dark', 'background-light', 'layout-dark', 'layout-light'];

const typographyVariants = [
  '36-R-40',
  '24-R-32',
  '36-B-40',
  '30-B-36',
  '30-M-36',
  '16-SB-24',
  '24-BL-32',
  '20-B-28',
  '18-B-28',
  '18-M-28',
  '18-R-28',
  '16-B-24',
  '16-M-24',
  '16-R-24',
  '14-B-20',
  '14-R-20',
  '12-B-16',
  '12-L-16',
];

// https://github.com/dcastil/tailwind-merge/blob/v2.2.2/src/lib/default-config.ts
// https://github.com/dcastil/tailwind-merge/blob/v2.2.2/docs/recipes.md
// https://github.com/dcastil/tailwind-merge/issues/368
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [...typographyVariants.map((val) => `text-${val}`)],
      'bg-color': [...colors.map((val) => `primary-${val}`), ...customColors],
      'border-color': [...colors.map((val) => `primary-${val}`), ...customColors],
      'text-color': [...colors.map((val) => `primary-${val}`), ...customColors],
    },
  },
});

export const joinClassNames = (...inputs: ClassValue[]) => {
  return twMerge(clsx(...inputs));
};
