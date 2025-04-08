import { HTMLAttributes, ReactNode } from 'react';

interface Props extends HTMLAttributes<HTMLUListElement> {
  children: ReactNode;
}

export default function MessageList({ children, ...rest }: Props) {
  return (
    <ul {...rest} className="flex w-full flex-col-reverse gap-y-5 overflow-auto p-5 scrollbar-hide">
      {children}
    </ul>
  );
}
