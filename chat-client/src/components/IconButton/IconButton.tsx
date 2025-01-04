import { ButtonHTMLAttributes, cloneElement, MouseEvent, ReactElement, useCallback } from 'react';

import { joinClassNames } from '@utils/format';

import { getIconButtonVariant, getIconSize, getIconVariant, IconButtonSizeType, IconButtonVariantType } from './styles';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: IconButtonSizeType;
  variant: IconButtonVariantType;
  icon: ReactElement;
}

export default function IconButton({ icon, onClick, size, type = 'button', variant, ...props }: Props) {
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
    <button {...props} className={getIconButtonVariant(variant)} type={type} onClick={handleClick}>
      {cloneElement(icon, { className: joinClassNames(getIconSize(size), getIconVariant(variant)) })}
    </button>
  );
}
