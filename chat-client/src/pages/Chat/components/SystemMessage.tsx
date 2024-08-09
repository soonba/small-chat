interface Props {
    text: string;
}

export default function SystemMessage({ text }: Props) {
    return (
        <li>
            <p className="text-14-B-20 w-full text-center text-primary-900 dark:text-primary-100">{text}</p>
        </li>
    );
}
