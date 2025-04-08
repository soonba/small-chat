export default function Error() {
  return (
    <div className="flex min-h-full w-full items-center justify-center !bg-fixed spring:bg-pink-gradient winter:bg-blue-gradient spring:dark:bg-dark-pink-gradient winter:dark:bg-dark-blue-gradient">
      <p className="text-center text-18-B-28 spring:text-pink-950 spring:text-shadow-unset winter:text-blue-100 winter:text-shadow sm:text-36-B-40 spring:dark:text-pink-50 spring:dark:text-shadow winter:dark:text-blue-100">
        문제가 발생하였습니다.
        <br />
        <br />
        잠시 후에 다시 시도해주세요.
      </p>
    </div>
  );
}
