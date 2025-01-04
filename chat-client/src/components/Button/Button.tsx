import { ButtonHTMLAttributes, MouseEvent, useCallback } from 'react';

import { joinClassNames } from '@utils/format';

import { ButtonSizeType, ButtonVariantType, getButtonSize, getButtonVariant } from './styles';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: ButtonSizeType;
  text: string;
  variant: ButtonVariantType;
  isFullWidth?: boolean;
}

export default function Button({ onClick, size, text, type = 'button', variant, ...props }: Props) {
  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.blur();
      if (onClick) {
        onClick(e);
      }
    },
    [onClick],
  );

  return (
    <button
      {...props}
      className={joinClassNames(getButtonVariant(variant), getButtonSize(size))}
      type={type}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}
