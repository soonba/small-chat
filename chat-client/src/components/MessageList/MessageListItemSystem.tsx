interface Props {
  text: string;
}

export default function MessageListItemSystem({ text }: Props) {
  return (
    <li className="mb-auto">
      <p className="w-full text-center text-12-B-16 spring:text-pink-950 winter:text-white sm:text-14-B-20 dark:spring:text-pink-50 dark:winter:text-blue-100">
        {text}
      </p>
    </li>
  );
}
