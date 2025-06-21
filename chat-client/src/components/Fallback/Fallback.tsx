export default function Fallback() {
  return (
    <div className="flex h-[calc(100vh-theme(spacing.14))] w-full items-center justify-center">
      <div className="flex w-full items-center justify-center gap-2">
        <span className="inline-block size-4 animate-bounce rounded-full spring:bg-pink-500 winter:bg-blue-500 dark:spring:bg-pink-100 dark:winter:bg-blue-100" />
        <span className="inline-block size-4 animate-bounce rounded-full [animation-delay:100ms] spring:bg-pink-600 winter:bg-blue-600 dark:spring:bg-pink-200 dark:winter:bg-blue-200" />
        <span className="inline-block size-4 animate-bounce rounded-full [animation-delay:150ms] spring:bg-pink-700 winter:bg-blue-700 dark:spring:bg-pink-300 dark:winter:bg-blue-300" />
        <span className="inline-block size-4 animate-bounce rounded-full [animation-delay:200ms] spring:bg-pink-800 winter:bg-blue-800 dark:spring:bg-pink-400 dark:winter:bg-blue-400" />
        <span className="inline-block size-4 animate-bounce rounded-full [animation-delay:250ms] spring:bg-pink-900 winter:bg-blue-900 dark:spring:bg-pink-500 dark:winter:bg-blue-500" />
      </div>
    </div>
  );
}
