interface Props {
  text: string;
}

export default function EmptyText({ text }: Props) {
  return <p className="text-center text-20-B-28 text-white sm:text-24-BL-32 dark:text-primary-100">{text}</p>;
}
