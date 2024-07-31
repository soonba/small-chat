import { ButtonHTMLAttributes } from 'react';

type VariantType = 'contained' | 'outlined' | 'text';
type SizeType = 'large' | 'medium' | 'small';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant: VariantType;
    size: SizeType;
    isFullWidth?: boolean;
    text: string;
}

const getStyle = (variant: VariantType) => {
    switch (variant) {
        case 'contained':
            return 'rounded-md bg-primary-900 text-primary-50 hover:opacity-80 disabled:pointer-events-none disabled:opacity-50';
        case 'text':
            return 'text-primary-900 hover:opacity-80 dark:text-primary-50';
        default:
            return 'rounded-md border border-primary-600 text-primary-600 hover:opacity-80 dark:border-primary-100 dark:text-primary-100 disabled:pointer-events-none disabled:opacity-30';
    }
};

const getSize = (size: SizeType) => {
    switch (size) {
        case 'large':
            return 'h-14 w-full text-lg font-bold';
        case 'small':
            return 'text-base font-medium';
        default:
            return 'h-11 w-full text-sm font-bold';
    }
};

export default function Button({ variant, size, text, type = 'button', onClick, ...props }: Props) {
    return (
        <button
            {...props}
            // eslint-disable-next-line react/button-has-type
            type={type}
            onClick={(e) => {
                e.currentTarget.blur();
                if (onClick) {
                    onClick(e);
                }
            }}
            className={`${getStyle(variant)} ${getSize(size)}`}
        >
            {text}
        </button>
    );
}
