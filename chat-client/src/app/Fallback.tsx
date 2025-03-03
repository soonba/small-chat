import Loader from '@components/Loader';

const Fallback = () => {
  return (
    <div className="flex h-[calc(100vh-theme(spacing.14))] w-full items-center justify-center">
      <Loader />
    </div>
  );
};

export default Fallback;
