interface Props {
  text: string;
}

export default function EmptyText({ text }: Props) {
  return <p className="text-center text-24-BL-32 text-white dark:text-primary-100">{text}</p>;
}
