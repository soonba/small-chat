interface Props {
  text: string;
}

export default function ChatListEmpty({ text }: Props) {
  return (
    <li className="flex min-h-inherit w-full items-center justify-center">
      <p className="text-center text-20-B-28 spring:text-pink-950 winter:text-white sm:text-24-BL-32 dark:spring:text-pink-50 dark:winter:text-blue-100">
        {text}
      </p>
    </li>
  );
}
