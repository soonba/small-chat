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
        className="flex flex-col justify-center gap-y-0.5 text-12-B-16 uppercase text-white dark:text-primary-100"
        htmlFor={id}
      >
        {labelText}
        <input
          {...rest}
          className="h-11 w-full truncate rounded-md border border-primary-900 bg-primary-50/50 px-2.5 py-2.5 text-14-M-20 text-primary-900 outline-none ring-0 placeholder:text-primary-900/50 hover:border-primary-950 focus:border-primary-950 disabled:pointer-events-none disabled:opacity-30 sm:h-16 sm:px-4 sm:py-5 sm:text-18-M-28 dark:border-primary-100/20 dark:bg-transparent dark:text-primary-100 dark:placeholder:text-primary-100/30 dark:hover:border-primary-100/40 dark:focus:border-primary-100/60"
          id={id}
          maxLength={maxLength}
          value={value}
          autoComplete="new-password"
          onChange={handleChange}
          onInput={handleInput}
        />
      </label>
      {helperText && (
        <small className="ml-1 mt-1 flex items-start gap-1 break-keep text-12-R-16 text-white text-shadow sm:items-center sm:text-14-R-20 dark:text-primary-200 dark:text-shadow-unset">
          <InformationCircleIcon className="size-4" />
          {helperText}
        </small>
      )}
    </div>
  );
}
