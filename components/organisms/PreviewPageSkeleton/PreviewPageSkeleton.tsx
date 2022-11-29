import Skeleton from 'components/atoms/Skeleton';

const PreviewPageSkeleton = () => {
  return (
    <div className="relative h-screen w-full">
      <div className="mx-auto flex h-full w-[90%] max-w-2xl flex-col items-center justify-center space-y-12">
        <Skeleton className="h-11 w-[80%] max-w-md" />
        <Skeleton className="h-[264px] w-full" />
        <Skeleton className="h-14 w-full md:max-w-xs" />
      </div>
    </div>
  );
};

export default PreviewPageSkeleton;
