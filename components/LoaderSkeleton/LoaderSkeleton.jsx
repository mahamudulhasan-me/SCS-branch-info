import { Skeleton } from "@mui/material";

const LoaderSkeleton = () => {
  return (
    <div className="px-4 -space-y-2">
      <Skeleton animation="wave" width="100%" height={90} />
      <Skeleton animation="wave" width="100%" height={90} />
      <Skeleton animation="wave" width="100%" height={90} />
      <Skeleton animation="wave" width="100%" height={90} />
    </div>
  );
};

export default LoaderSkeleton;
