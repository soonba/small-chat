export default function MessageListSkeleton() {
  return (
    <div className="flex w-full animate-pulse flex-col gap-y-5 overflow-auto p-5 scrollbar-hide">
      <div className="mx-auto mb-auto h-4 w-40 rounded spring:bg-white/30 winter:bg-blue-50/10 sm:h-5 spring:dark:bg-pink-50/10 winter:dark:bg-blue-50/10" />
      {Array.from({ length: 5 }, (_, index) => (
        <div className={`${index % 2 !== 0 ? 'ml-auto' : 'mr-auto'} w-max sm:w-1/3`}>
          <div className={`${index % 2 !== 0 ? 'flex-row-reverse' : 'flex-row'} flex items-start gap-x-2.5`}>
            <div className="size-12 shrink-0 rounded-lg spring:bg-white/30 winter:bg-blue-50/10 spring:dark:bg-pink-50/10 winter:dark:bg-blue-50/10" />
            <div className="h-4 w-12 rounded spring:bg-white/30 winter:bg-blue-50/10 sm:h-5 spring:dark:bg-pink-50/10 winter:dark:bg-blue-50/10" />
          </div>
          <div
            className={`${index % 2 !== 0 ? 'mr-2.5 flex-col items-start sm:flex-row-reverse' : 'ml-2.5 flex-col items-end sm:flex-row'} -mt-2.5 flex w-full gap-2.5 sm:items-end`}
          >
            <div
              className={`${index % 2 !== 0 ? 'mr-[50px] !rounded-tr-none sm:mr-[60px]' : 'ml-10 !rounded-tl-none sm:ml-[50px]'} h-[38px] w-40 rounded-xl spring:bg-white/30 winter:bg-blue-50/10 sm:h-[62px] sm:w-full sm:min-w-40 sm:rounded-3xl spring:dark:bg-pink-50/10 winter:dark:bg-blue-50/10`}
            />
            <div className="h-3 w-12 shrink-0 rounded spring:bg-white/30 winter:bg-blue-50/10 sm:h-4 spring:dark:bg-pink-50/10 winter:dark:bg-blue-50/10" />
          </div>
        </div>
      ))}
    </div>
  );
}
