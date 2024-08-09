interface Props {
    text: string;
}

export default function EmptyText({ text }: Props) {
    return <p className="text-24-BL-32 text-center text-primary-900 dark:text-primary-100">{text}</p>;
}
