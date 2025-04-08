export default function MessageListSpinner() {
  return (
    <li className="flex h-32 w-full items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 !border-b-transparent spring:border-pink-900 winter:border-blue-600 spring:dark:border-pink-100 winter:dark:border-blue-100" />
    </li>
  );
}
