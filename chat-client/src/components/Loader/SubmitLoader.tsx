export default function SubmitLoader() {
  return (
    <div className="fixed inset-0 z-1000 flex cursor-progress items-center justify-center bg-black/30">
      <div className="flex w-full items-center justify-center gap-2">
        <span className="inline-block size-4 animate-bounce rounded-full spring:bg-pink-900 winter:bg-blue-600 spring:dark:bg-pink-100 winter:dark:bg-blue-100" />
        <span className="inline-block size-4 animate-bounce rounded-full [animation-delay:100ms] spring:bg-pink-900 winter:bg-blue-600 spring:dark:bg-pink-100 winter:dark:bg-blue-100" />
        <span className="inline-block size-4 animate-bounce rounded-full [animation-delay:150ms] spring:bg-pink-900 winter:bg-blue-600 spring:dark:bg-pink-100 winter:dark:bg-blue-100" />
      </div>
    </div>
  );
}
