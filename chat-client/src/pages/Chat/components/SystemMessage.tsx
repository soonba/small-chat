interface Props {
  text: string;
}

export default function SystemMessage({ text }: Props) {
  return (
    <li className="mb-auto">
      <p className="w-full text-center text-12-B-16 text-white sm:text-14-B-20 dark:text-primary-100">{text}</p>
    </li>
  );
}
