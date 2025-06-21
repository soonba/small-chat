export default function Loader() {
  return (
    <div className="flex w-full items-center justify-center gap-2">
      <span className="inline-block size-4 animate-bounce rounded-full spring:bg-pink-900 winter:bg-blue-600 dark:spring:bg-pink-100 dark:winter:bg-blue-100" />
      <span className="inline-block size-4 animate-bounce rounded-full [animation-delay:100ms] spring:bg-pink-900 winter:bg-blue-600 dark:spring:bg-pink-100 dark:winter:bg-blue-100" />
      <span className="inline-block size-4 animate-bounce rounded-full [animation-delay:150ms] spring:bg-pink-900 winter:bg-blue-600 dark:spring:bg-pink-100 dark:winter:bg-blue-100" />
    </div>
  );
}
