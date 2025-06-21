import { ChangeEvent, FormEvent, InputHTMLAttributes, useCallback, useId } from 'react';

import { InformationCircleIcon } from '@heroicons/react/20/solid';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  helperText?: string;
  labelText?: string;
  onChange?: (newValue: string) => void;
}

export default function TextField({ helperText, labelText, maxLength, onChange, value, ...rest }: Props) {
  const id = useId();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e.currentTarget.value);
      }
    },
    [onChange],
  );

  const handleInput = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.type === 'text') {
        if (maxLength && e.currentTarget.value.length > e.currentTarget.maxLength) {
          // 한글 글자수 제한
          e.currentTarget.value = e.currentTarget.value.slice(0, e.currentTarget.maxLength);
        }
      }
    },
    [maxLength],
  );

  return (
    <div>
      <label
        className="flex flex-col justify-center gap-y-0.5 text-12-B-16 uppercase spring:text-pink-950 winter:text-white dark:spring:text-pink-50 dark:winter:text-blue-100"
        htmlFor={id}
      >
        {labelText}
        <input
          {...rest}
          className="h-11 w-full truncate rounded-md border px-2.5 py-2.5 text-14-M-20 disabled:pointer-events-none disabled:opacity-30 spring:border-pink-900 spring:bg-white spring:text-pink-950 spring:placeholder:text-pink-950/50 hover:spring:border-pink-950 focus:spring:border-pink-950 winter:border-blue-900 winter:bg-blue-50/50 winter:text-blue-900 winter:placeholder:text-blue-900/50 hover:winter:border-blue-950 focus:winter:border-blue-950 sm:h-16 sm:px-4 sm:py-5 sm:text-18-M-28 dark:bg-transparent dark:spring:border-pink-100/20 dark:spring:text-pink-50 dark:spring:placeholder:text-pink-50/80 dark:hover:spring:border-pink-100/40 dark:focus:spring:border-pink-100/60 dark:winter:border-blue-100/20 dark:winter:text-blue-100 dark:winter:placeholder:text-blue-100/30 dark:hover:winter:border-blue-100/40 dark:focus:winter:border-blue-100/60"
          id={id}
          maxLength={maxLength}
          value={value}
          autoComplete="new-password"
          onChange={handleChange}
          onInput={handleInput}
        />
      </label>
      {helperText && (
        <small className="ml-1 mt-1 flex items-start gap-1 break-keep text-12-R-16 spring:text-pink-950 winter:text-white winter:text-shadow sm:items-center sm:text-14-R-20 dark:spring:text-pink-50 dark:spring:text-shadow dark:winter:text-blue-200 dark:winter:text-shadow-unset">
          <InformationCircleIcon className="size-4 winter:text-shadow dark:spring:text-shadow dark:winter:text-shadow-unset" />
          {helperText}
        </small>
      )}
    </div>
  );
}
