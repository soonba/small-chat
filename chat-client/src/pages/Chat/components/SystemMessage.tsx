interface Props {
  text: string;
}

export default function SystemMessage({ text }: Props) {
  return (
    <li className="mb-auto">
      <p className="w-full text-center text-14-B-20 text-white dark:text-primary-100">{text}</p>
    </li>
  );
}
