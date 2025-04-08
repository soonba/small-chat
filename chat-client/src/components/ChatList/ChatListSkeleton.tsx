export default function ChatListSkeleton() {
  return (
    <div className="min-h-inherit space-y-2.5">
      {Array.from({ length: 5 }, (_, index) => (
        <div
          key={index}
          className="flex w-full animate-pulse items-center rounded-lg px-2.5 py-2.5 spring:bg-white/20 winter:bg-blue-50/10 sm:px-4 spring:dark:bg-pink-50/10 winter:dark:bg-blue-50/10"
        >
          <div className="flex w-full items-center gap-2.5 sm:gap-4">
            <div className="size-12 shrink-0 rounded-lg spring:bg-white/30 winter:bg-blue-50/20 spring:dark:bg-pink-50/20 winter:dark:bg-blue-50/20" />
            <div className="w-full space-y-1 sm:space-y-2.5">
              <div className="flex w-full items-center justify-between gap-x-1 sm:gap-x-2.5">
                <div className="h-4 w-1/4 rounded spring:bg-white/30 winter:bg-blue-50/20 sm:h-5 spring:dark:bg-pink-50/20 winter:dark:bg-blue-50/20" />
                <div className="h-2 w-12 rounded spring:bg-white/30 winter:bg-blue-50/20 sm:h-3 spring:dark:bg-pink-50/20 winter:dark:bg-blue-50/20" />
              </div>
              <div className="h-3 w-2/3 rounded spring:bg-white/30 winter:bg-blue-50/20 sm:h-4 spring:dark:bg-pink-50/20 winter:dark:bg-blue-50/20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
