export default function Loader() {
  return (
    <div className="flex w-full items-center justify-center gap-2">
      <span className="inline-block size-4 animate-bounce rounded-full bg-primary-900 dark:bg-primary-100" />
      <span className="inline-block size-4 animate-bounce rounded-full bg-primary-900 [animation-delay:100ms] dark:bg-primary-100" />
      <span className="inline-block size-4 animate-bounce rounded-full bg-primary-900 [animation-delay:150ms] dark:bg-primary-100" />
    </div>
  );
}
