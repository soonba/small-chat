interface Props {
    text: string;
}

export default function SystemMessage({ text }: Props) {
    return (
        <li>
            <p className="w-full text-center text-14-B-20 text-primary-900 dark:text-primary-100">{text}</p>
        </li>
    );
}
