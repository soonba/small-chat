interface Props {
  text: string;
}

export default function ChatListEmpty({ text }: Props) {
  return (
    <li className="flex min-h-inherit w-full items-center justify-center">
      <p className="text-center text-20-B-28 spring:text-pink-950 winter:text-white sm:text-24-BL-32 spring:dark:text-pink-50 winter:dark:text-blue-100">
        {text}
      </p>
    </li>
  );
}
