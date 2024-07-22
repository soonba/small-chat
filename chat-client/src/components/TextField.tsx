import { InputHTMLAttributes, useId } from 'react';

import { InformationCircleIcon } from '@heroicons/react/20/solid';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    labelText?: string;
    onChange: (newValue: string) => void;
    helperText?: string;
}

export default function TextField({ labelText, helperText, value, onChange, ...rest }: Props) {
    const id = useId();

    return (
        <div>
            <label
                htmlFor={id}
                className="flex flex-col justify-center gap-y-0.5 text-xs font-bold uppercase text-primary-900 dark:text-primary-100"
            >
                {labelText}
                <input
                    {...rest}
                    id={id}
                    autoComplete="new-password"
                    value={value}
                    onChange={(e) => onChange(e.currentTarget.value)}
                    onInput={(e) => {
                        if (e.currentTarget.type === 'text') {
                            if (rest.maxLength && e.currentTarget.value.length > e.currentTarget.maxLength) {
                                // 한글 글자수 제한
                                e.currentTarget.value = e.currentTarget.value.slice(0, e.currentTarget.maxLength);
                            }
                        }
                    }}
                    className="h-16 w-full truncate rounded-md border border-primary-900 px-4 py-5 text-lg font-medium text-primary-950 outline-none ring-0 placeholder:text-primary-900/50 hover:border-primary-950 hover:bg-primary-50/50 focus:border-primary-950 focus:bg-primary-100/50 dark:border-primary-100/20 dark:bg-background-dark dark:text-primary-50 dark:placeholder:text-primary-50/30 dark:hover:border-primary-100/40 dark:hover:bg-background-dark dark:focus:border-primary-100/60 dark:focus:bg-background-dark"
                />
            </label>
            {helperText && (
                <small className="ml-1 mt-1 flex items-center gap-1 text-sm font-normal text-primary-950 dark:text-primary-200">
                    <InformationCircleIcon className="h-4 w-4" />
                    {helperText}
                </small>
            )}
        </div>
    );
}
